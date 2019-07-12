import { Group } from './group.class';

export class User {
  activeGroup: string;
  email: string;
  groups: Group[];
  id: string;
  name: string;

  constructor(o: object) {
    Object.keys(o)
      .forEach(item => this[item] = o[item]);
  }

  toPlain() {
    return JSON.parse(JSON.stringify(this));
  }
}