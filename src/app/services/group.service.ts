import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
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

  getActiveGroup(): Observable<Group> {
    const activeGroup = this.userService.userInfo.activeGroup;
    if (!activeGroup) { return of(null); }
    return this.group
      .doc(activeGroup)
        .valueChanges()
          .pipe(map(group => new Group(group as Group)));
  }

  getGroupByName(name) {
    return this.firestore
      .collection('groups', ref => ref.where('name', '==', name));
  }

  createGroup(group: Group) {
    const groupId = this.firestore.createId();
    const {activeGroup, groups, ...owner} = this.userService.userInfo;
    group.id = groupId;
    group.owner = owner as User;
    group.users.push(owner as User);
    return this.group.doc(groupId).set(group)
  }

}
