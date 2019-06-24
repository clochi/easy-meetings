import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'em-no-group',
  templateUrl: './no-group.component.html',
  styleUrls: ['./no-group.component.less']
})
export class NoGroupComponent implements OnInit {

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
              debugger
              console.log(data)
            })
        }
      })
  }

  createGroup(form) {
    console.log(form.value)
  }

}
