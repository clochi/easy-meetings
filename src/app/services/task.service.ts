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

  saveTasks(tasks: Task[]) {
    const taskBatch = this.firestore.firestore.batch();
    tasks.forEach(task => {
      task.id = this.firestore.createId();
      const taskRef = this.firestore.collection('tasks')
        .doc(task.id).ref;
      taskBatch.set(taskRef, task.toPlain())
    })
    return taskBatch.commit();
  }

  updateTask(taskId, status) {
    return this.tasks.doc(taskId)
      .update({status: status ? '3' : '1'})
  }
}
