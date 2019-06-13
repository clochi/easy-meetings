import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Track } from '../classes/track.class';
import { UserService } from './user.service';
import { User } from '../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  get tracks() {
    return this.firestore.firestore.collection('tracks');
  }
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}
  
  saveTracks(tracks: Track[]) {
    const trackBatch = this.firestore.firestore.batch();
    tracks.forEach(track => {
      const {activeGroup, groups, ...user} = this.userService.userInfo
      track.user = user as User;
      track.id = this.firestore.createId();
      const trackRef = this.firestore.collection('tracks').doc(track.id).ref; 
      trackBatch.set(trackRef, track.toPlain())
    });
    return trackBatch.commit();
  }

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
          .orderBy('date', 'desc')
            .onSnapshot(data => {
              observer.next(data.docs);
            })
    })
  }
}
