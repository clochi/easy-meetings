import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private get group() {
    return this.firestore.collection('groups');
  }
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService) { }

  getActiveGroup() {
    return this.group
      .doc(this.userService.userInfo.activeGroup)
        .snapshotChanges()

  }
}
