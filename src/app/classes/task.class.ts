import { User } from './user.class';
import { Track } from './track.class';

export class Task {
  assigned: User;
  date: Date;
  dueDate?: Date;
  id?: number;
  status: number;
  task: string;
  topicId: number;
  track?: Track[];
}