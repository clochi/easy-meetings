import { User } from './user.class';

export class Track {
  date: Date;
  id: string;
  info: string;
  taskId: string;
  topicId: string;
  meetingId: string;
  user: User;
  userName: string;

  constructor(track: object) {
    Object.keys(track)
      .forEach(key => {
        this[key] = key === 'date' ?
          new Date(track[key]) : track[key]
    })
  }
}