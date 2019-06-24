import { User } from './user.class';

export class Group {
  id: string;
  name: string;
  users: User[];
  
  constructor(group: Group) {
    Object.assign(this, group);
  }

  toPlain() {
    JSON.parse(JSON.stringify(this));
  }
}