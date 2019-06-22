import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { TopicService } from './topic.service';
import { TaskService } from './task.service';
import { Meeting } from '../classes/meeting.class';
import { Observable, combineLatest } from 'rxjs';
import { Topic } from '../classes/topic.class';
import { Task } from '../classes/task.class';
import { TrackService } from './track.service';
import { Track } from '../classes/track.class';
import * as moment from 'moment';
import { map, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  public get meetings() {
    return this.firestore.collection('groups')
      .doc(this.userService.userInfo.activeGroup)
        .collection('meetings').ref;
  }
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private topicService: TopicService,
    private taskService: TaskService,
    private trackService: TrackService
  ) { }
  
  getAllMeetings(): Observable<Meeting[]> {
    return this.firestore
      .collection(this.meetings)
        .valueChanges()
          .pipe(map(meetings => 
            meetings.map(meeting => 
              new Meeting(meeting as Meeting))
              ));
  }

  getMeeting(id: string) {
    const meeting$ = this.firestore.collection(this.meetings).doc(id).valueChanges() as Observable<Meeting>;
    const topics$ = this.topicService.getTopics(id) as Observable<Topic[]>;
    const tasks$ = this.taskService.getAllTasksInMeeting(id) as Observable<Task[]>;
    const tracks$ = this.trackService.getAllTracksByMeeting(id) as Observable<Track[]>;
    return combineLatest(meeting$, topics$, tasks$, tracks$)
      .pipe(map(data => {
        const meeting= new Meeting(data[0]);
        meeting.topics = data[1];
        meeting.topics.forEach(topic => {
          topic.tasks = data[2].filter(task => task.topicId === topic.id);
          topic.tasks.forEach(task => {
            task.tracks = data[3].filter(track => track.taskId === task.id)
          })
        })
        return meeting;
      }))
  }

  getNextMeetings(): Observable<any[]>{
    return this.firestore
      .collection(this.meetings, ref => ref.where('status', '==', true)
        .orderBy('date', 'desc').limit(15)).valueChanges()
  }

  saveMeeting(meeting: Meeting) {
    meeting.owner = this.userService.userInfo.id;
    meeting.groupId = this.userService.userInfo.activeGroup;
    return this.meetings.add(meeting);
  }

}
