import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Group } from '../classes/group.class';
import { map } from 'rxjs/operators';

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

}
