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

  getUserByTyping(text) {
    return (this.users.valueChanges())
      .pipe(map(user => user.find(user => (<User>user).email.match(text))
      ))
  }

  saveUser(user) {
    this._userInfo = new User(user);
    return this.users
      .doc(user.id)
        .set(user)
  }

}
