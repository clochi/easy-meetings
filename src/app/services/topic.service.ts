import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Topic } from '../classes/topic.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getTopics(meetingId: string): Observable<Topic[]> {
    return this.firestore
      .collection('topics', ref => ref.where('meetingId', '==', meetingId))
        .valueChanges()
          .pipe(map(topics => topics
              .map(topic => new Topic(topic as Topic))
              ))
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
