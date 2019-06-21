import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { Task } from '../classes/task.class';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getAllTasksInMeeting(meetingId: string): Observable<Task[]> {
    return this.firestore
      .collection('tasks', ref => ref.where('meetingId', '==', meetingId))
        .valueChanges()
          .pipe(map(tasks => tasks
              .map(task => new Task(task as Task))
              ))
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
