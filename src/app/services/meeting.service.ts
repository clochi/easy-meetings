import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Meeting } from '../meeting/meeting.class';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService) { }

  saveMeeting(meeting: Meeting) {
    meeting.owner = this.userService.userInfo.id;
    return this.firestore.collection('groups')
      .doc(this.userService.userInfo.activeGroup)
        .collection('meetings')
          .add(meeting)
  }
}
