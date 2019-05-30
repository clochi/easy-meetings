import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Meeting } from '../classes/meeting.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private get meetings() {
    return this.firestore.firestore.collection('groups')
      .doc(this.userService.userInfo.activeGroup)
        .collection('meetings');
  }
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService) { }
  
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
    return this.meetings.add(meeting);
  }

}
