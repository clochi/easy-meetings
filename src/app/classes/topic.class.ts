import { Task } from './task.class';

export class Topic {
  id: string;
  meetingId: string; 
  tasks?: Task[];
  topic: string;

  constructor(topic: Topic) {
    Object.assign(this, topic);
  }

  toPlain() {
    return JSON.parse(JSON.stringify(this));
  }
}