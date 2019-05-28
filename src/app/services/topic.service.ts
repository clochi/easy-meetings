import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Topic } from '../classes/topic.class';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService) { }

  saveTopics(topics: Topic[]) {
    const meetingId = topics[0].meetingId;
    const topicsParsed = [];
    topics.forEach(topic => {
      topic.id = this.firestore.createId();
      topicsParsed.push(topic.toPlain());
    });
    return this.firestore.collection('topics')
      .doc(meetingId)
        .set({meetingId, topics: topicsParsed})
  }
}
