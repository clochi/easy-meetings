import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'em-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.less']
})
export class MyGroupsComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getMyUserInfo()
      .subscribe(data => {
        debugger
      })
  }

}
