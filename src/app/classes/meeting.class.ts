import { Topic } from './topic.class';

export class Meeting {
  date: Date;
  id: string;
  owner: string;
  place: string;
  status: boolean = true;
  time: Date;
  topics?: Topic[];
  users: string; //This is going to be User type

  constructor(meeting: Meeting) {
    Object.keys(meeting)
      .forEach(item => this[item] = meeting[item]);
  }

  toPlain() {
    return JSON.parse(JSON.stringify(this));
  }
}
