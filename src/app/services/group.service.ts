import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Group } from '../classes/group.class';
import { map } from 'rxjs/operators';
import { User } from '../classes/user.class';

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

  getActiveGroup() :Observable<Group>{
    return this.group
      .doc(this.userService.userInfo.activeGroup)
        .valueChanges()
          .pipe(map(group => new Group(group as Group)));
  }

  createGroup(group: Group) {
    const groupId = this.firestore.createId();
    const {activeGroup, groups, ...owner} = this.userService.userInfo
    group.id = groupId;
    group.owner = owner as User;
    group.users.push(owner as User);
    return this.group.doc(groupId).set(group)
  }

}
