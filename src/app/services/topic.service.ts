import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Topic } from '../classes/topic.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getTopics(meetingId: string): Observable<QueryDocumentSnapshot<DocumentData>[]> {
    return new Observable(observer => {
      this.firestore.firestore.collection('topics')
        .where('meetingId', '==', meetingId)
          .onSnapshot(data => {
            observer.next(data.docs);
          })
    })
  }

  saveTopics(topics: Topic[]) {
    const topicBatch = this.firestore.firestore.batch();
    topics.forEach(topic => {
      topic.id = this.firestore.createId();
      const newDoc = this.firestore.collection('topics')
        .doc(topic.id).ref;
      topicBatch.set(newDoc, topic.toPlain())
    });
    return topicBatch.commit()
  }
}
