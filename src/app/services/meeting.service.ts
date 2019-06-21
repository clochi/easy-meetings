import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { TopicService } from './topic.service';
import { TaskService } from './task.service';
import { Meeting } from '../classes/meeting.class';
import { Observable } from 'rxjs';
import { Topic } from '../classes/topic.class';
import { Task } from '../classes/task.class';
import { TrackService } from './track.service';
import { Track } from '../classes/track.class';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

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
    const meeting = this.firestore.collection(this.meetings).doc(id).valueChanges();
    const topics = this.topicService.getTopics(id);
    const tasks = this.taskService.getAllTasksInMeeting(id);
    const tracks = this.trackService.getAllTracksByMeeting(id);
  }

  // getMeeting(id: string): Observable<Meeting> {
  //   let returnMeeting: Meeting;
  //   return new Observable(observer => {
  //     this.meetings.doc(id).onSnapshot(meeting => {
  //       if(!meeting.data()) {
  //         observer.next(returnMeeting);
  //         return;
  //       };
  //       returnMeeting = new Meeting(meeting.data() as Meeting);
  //       this.topicService.getTopics(meeting.id)
  //         .subscribe(topics => {
  //           topics.forEach(topic => {
  //             returnMeeting.topics.push(new Topic(topic.data() as Topic));
  //           });
  //           this.taskService.getAllTasksInMeeting(id)
  //             .subscribe(tasksData => {
  //               const tasks: Task[] = [];
  //               tasksData.forEach(task => {
  //                 tasks.push(new Task(task.data() as Task))
  //               });
  //               this.trackService.getAllTracksByMeeting(id)
  //                 .subscribe(tracksData => {
  //                   const tracks: Track[] = [];
  //                   tracksData.forEach(track => {
  //                     tracks.push(new Track(track.data() as Track))
  //                   });
  //                   returnMeeting.topics.forEach(topic => {
  //                     topic.tasks = tasks.filter(task => task.topicId == topic.id);
  //                     topic.tasks.forEach(task => {
  //                       task.tracks = tracks.filter(track => track.taskId == task.id)
  //                     });
  //                   });
  //                   observer.next(returnMeeting);
  //                 });
  //             });
  //         });
  //     });
  //   });
  // }

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
