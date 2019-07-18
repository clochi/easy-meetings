import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Group } from 'src/app/classes/group.class';

@Component({
  selector: 'em-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less']
})
export class GroupListComponent implements OnInit {
  userServiceSubscription: Subscription;
  groups: Group[] = [];
  isLoading = false;
  constructor(
    private userService: UserService
  ) { }

  switchGroup(group: Group) {
    if (this.userService.userInfo.activeGroup === group.id) { return ; }
    this.isLoading = true;
    this.userService.updateUserInfo(this.userService.userInfo.id, { activeGroup: group.id} )
      .then(() => {
        this.isLoading = false ;
      });
  }

  ngOnInit() {
    this.userServiceSubscription = this.userService.getMyUserInfo()
      .subscribe(userInfo => {
        this.groups = userInfo.groups;
      });
  }

  ngOnDestroy() {
    this.userServiceSubscription.unsubscribe();
  }

}
