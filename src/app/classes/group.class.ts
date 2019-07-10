import { User } from './user.class';

export class Group {
  id: string;
  name: string;
  owner: User;
  users: User[];
  
  constructor(group: Group) {
    Object.assign(this, group);
  }

  toPlain() {
    return JSON.parse(JSON.stringify(this));
  }
}