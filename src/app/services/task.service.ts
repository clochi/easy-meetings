import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { Task } from '../classes/task.class';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  get tasks() {
    return this.firestore.firestore.collection('tasks');
  }
  constructor(private firestore: AngularFirestore) { }

  getTasks(meetingId: string, topicId: string): Observable<QueryDocumentSnapshot<DocumentData>[]> {
    return new Observable(observer => {
      this.tasks
        .where('meetingId', '==', meetingId)
          .where('topicId', '==', topicId)
            .onSnapshot(data => {
              observer.next(data.docs);
            })
    })
  }

  getAllTasksInMeeting(meetingId: string): Observable<QueryDocumentSnapshot<DocumentData>[]> {
    return new Observable(observer => {
      this.tasks
        .where('meetingId', '==', meetingId)
          .onSnapshot(data => {
            observer.next(data.docs);
          })
    })
  }
}
