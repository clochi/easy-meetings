import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user.class';

@Component({
  selector: 'em-no-group',
  templateUrl: './no-group.component.html',
  styleUrls: ['./no-group.component.less']
})
export class NoGroupComponent implements OnInit {
  suggestedUser: User[] = [];
  userControl = new FormControl();
  constructor(
    private userService: UserService
  ) {  }

  ngOnInit() {
    this.userControl.valueChanges
      .subscribe(input => {
        if(input.match('@')) {
          this.userService.getUserByTyping(input)
            .subscribe(data => {
              data && this.suggestedUser.push(data);
            })
        } else {
          this.suggestedUser = [];
        }
      })
  }

  createGroup(form) {
    console.log(form.value)
  }

}
