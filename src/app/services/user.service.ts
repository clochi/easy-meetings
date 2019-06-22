import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../classes/user.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private _userInfo: User;
  get userInfo(): User {
    return this._userInfo;
  }
  set userInfo(value) {
    this._userInfo = value;
  }
  constructor(private firestore: AngularFirestore) { }

  getUserInfo(id) {
    return this.firestore.collection('users').doc(id).valueChanges();
  }

  saveUser(user) {
    this._userInfo = new User(user);
    return this.firestore.collection('users')
      .doc(user.id)
        .set(user)
  }

}
