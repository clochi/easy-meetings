export class User {
  activeGroup: string;
  email: string;
  groups: string[];
  id: string;
  name: string;

  constructor(o: Object) {
    Object.keys(o)
      .forEach(item => this[item] = o[item])
  }

  toPlain() {
    return JSON.parse(JSON.stringify(this));
  }
}