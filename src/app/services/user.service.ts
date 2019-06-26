import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../classes/user.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  insertGroupInUsers(groupId: string, users: User[]) {
    const userBatch = this.firestore.firestore.batch();
    users.forEach(user => {
      const groups = [...user.groups, groupId]
      const userRef = this.users.doc(user.id).ref;
      userBatch.update(userRef, {groups: groups})
    })
    return userBatch.commit();
  }

  getUserByTyping(text): Observable<User> {
    return (this.users.valueChanges())
      .pipe(
        map(user => user.find(user => {
          return !!text.match(/\w+@/)
            && !!(<User>user).email.match(text) && (<User>user).email !== this.userInfo.email
        }
        )),
        map(user => user && new User(user))
        )
        
  }

  saveUser(user) {
    this._userInfo = new User(user);
    return this.users
      .doc(user.id)
        .set(user)
  }

}
