import { User } from './user.class';
import { Track } from './track.class';

export class Task {
  assigned: User;
  date: Date;
  dueDate?: Date;
  id?: string;
  status: number;
  task: string;
  topicId: string;
  meetingId: string;
  tracks?: Track[];

  constructor(o: Task) {
    Object.keys(o)
      .forEach(key => {
        switch (key) {
          case 'date':
          case 'dueDate':
            this[key] = new Date(o[key]);
            break;
          default:
            this[key] = o[key];
        }
      })
  }
}