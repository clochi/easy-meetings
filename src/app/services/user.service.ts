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
  constructor(private firestore: AngularFirestore) { }

  getUserInfo(id) {
    return new Observable(observer => {
      this.firestore.collection('users').doc(id).valueChanges()
        .subscribe(user => {
          this._userInfo = new User(user);
          observer.next()
        });
    }) 
  }

  saveUser(user) {
    this._userInfo = new User(user);
    return this.firestore.collection('users')
      .doc(user.id)
        .set(user)
  }

}
