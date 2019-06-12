import { User } from './user.class';
import { JsonPipe } from '@angular/common';

export class Track {
  date: Date;
  id: string;
  info: string;
  meetingId: string;
  taskId: string;
  user: User;

  constructor(track: object) {
    Object.keys(track)
      .forEach(key => {
        this[key] = key === 'date' ?
          new Date(track[key]) : track[key]
    })
  }

  toPlain() {
    return JSON.parse(JSON.stringify(this));
  }
}