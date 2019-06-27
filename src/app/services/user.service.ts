import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../classes/user.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../classes/group.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get users() {
    return this.firestore.collection('users');
  }
  private _userInfo: User;
  get userInfo(): User {
    return this._userInfo;
  }
  set userInfo(value) {
    this._userInfo = value;
  }
  constructor(private firestore: AngularFirestore) { }

  getUserInfo(id) {
    return this.users.doc(id).valueChanges();
  }

  updateUserInfo(id, data) {
    return this.users.doc(id).ref
      .update(data)
  }

  insertGroupInUsers(groupObject: Group, userList: User[]) {
    const {owner, users, ...group } = groupObject;
    const userBatch = this.firestore.firestore.batch();
    userList.forEach(user => {
      const groups = [...user.groups, group]
      const userRef = this.users.doc(user.id).ref;
      userBatch.update(userRef, {groups: groups})
    })
    return userBatch.commit();
  }

  getUserByTyping(text): Observable<User[]> {
    return (this.users.valueChanges())
      .pipe(
        map(user => user.filter(user => {
          const textPattern = new RegExp(text, 'i');
            return !!(<User>user).name.match(textPattern) && (<User>user).name !== this.userInfo.name;
        })
          .map(user => new User(user))
        )
        )
  }

  getUserGroups() {
    return this.users
      .doc(this.userInfo.id)
        .valueChanges()
  } 

  saveUser(user) {
    this._userInfo = new User(user);
    return this.users
      .doc(user.id)
        .set(user)
  }

}
