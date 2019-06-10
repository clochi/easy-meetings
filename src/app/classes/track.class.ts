import { User } from './user.class';

export class Track {
  date: Date;
  id: string;
  info: string;
  taskId: string;
  user: User;

  constructor(track: object) {
    Object.keys(track)
      .forEach(key => {
        this[key] = key === 'date' ?
          new Date(track[key]) : track[key]
    })
  }
}