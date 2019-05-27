import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userInfo;
  constructor(private firestore: AngularFirestore) { }

  getUserInfo(id) {
    this.firestore.collection('users').doc(id).get()
      .subscribe(user => {
        this.userInfo = user.data()});
  }
}
