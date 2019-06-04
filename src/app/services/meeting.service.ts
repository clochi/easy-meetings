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

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  public get meetings() {
    return this.firestore.firestore.collection('groups')
      .doc(this.userService.userInfo.activeGroup)
        .collection('meetings');
  }
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private topicService: TopicService,
    private taskService: TaskService,
    private trackService: TrackService
  ) { }
  
  getAllMeetings(): Observable<Meeting[]> {
    return new Observable(observer => {
      const meetingList: Meeting[] = [];
      this.meetings
        .onSnapshot(meetings => {
          meetings.forEach(meeting => {
            meetingList.push(new Meeting(meeting.data() as Meeting))
          })
          observer.next(meetingList);
        })
    })
  }

  getMeeting(id: string): Observable<Meeting> {
    let returnMeeting: Meeting;
    let tasks: Task[] = [];
    let tracks: Track[] = [];

    return new Observable(observer => {
      this.meetings.doc(id).onSnapshot(meeting => {
        if(!meeting.data()) {
          observer.next(returnMeeting);
          return;
        };
        returnMeeting = new Meeting(meeting.data() as Meeting);
        this.topicService.getTopics(meeting.id)
          .subscribe(topics => {
            topics.forEach(topic => {
              returnMeeting.topics.push(new Topic(topic.data() as Topic));
            });
            this.taskService.getAllTasksInMeeting(id)
              .subscribe(tasksData => {
                tasksData.forEach(task => {
                  tasks.push(new Task(task.data() as Task))
                });
                this.trackService.getTracksByTask(id)
                  .subscribe(tracksData => {
                    tracksData.forEach(track => {
                      tracks.push(new Track(track.data() as Track))
                    });
                    returnMeeting.topics.forEach(topic => {
                      topic.tasks = tasks.filter(task => task.topicId == topic.id);
                      topic.tasks.forEach(task => {
                        task.tracks = tracks.filter(track => track.taskId == task.id)
                      });
                    });
                    observer.next(returnMeeting);
                  });
              });
          });
      });
    });
  }

  getNextMeetings(): Observable<Meeting[]> {
    return new Observable(observer => {
      this.meetings.where('status', '==', true).orderBy('date', 'desc').limit(10)
        .onSnapshot(data => {
          const meetingList: Meeting[] = [];
          data.docs.forEach(meeting => {
            meetingList.push( new Meeting(meeting.data() as Meeting) );
          })
          observer.next(meetingList);
        })
    })
  }

  saveMeeting(meeting: Meeting) {
    meeting.owner = this.userService.userInfo.id;
    meeting.groupId = this.userService.userInfo.activeGroup;
    return this.meetings.add(meeting);
  }

}
