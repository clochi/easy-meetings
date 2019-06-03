import { Injectable } from '@angular/core';
import { User } from '../classes/user.class';
import { AngularFirestore, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  get tracks() {
    return this.firestore.firestore.collection('tracks');
  }
  constructor(
    private firestore: AngularFirestore
  ) {}
  
  getTracksByTask(taskId: string): Observable<QueryDocumentSnapshot<DocumentData>[]> {
    return new Observable(observer => {
      this.tracks
        .where('taskId', '==', taskId)
          .onSnapshot(data => {
            observer.next(data.docs);
          })
    })
  }

  getAllTracksByMeeting(meetingId: string): Observable<QueryDocumentSnapshot<DocumentData>[]> {
    return new Observable(observer => {
      this.tracks
        .where('meetingId', '==', meetingId)
          .onSnapshot(data => {
            observer.next(data.docs);
          })
    })
  }
}
