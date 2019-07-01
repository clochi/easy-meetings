import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user.class';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'em-people-picker',
  templateUrl: './people-picker.component.html',
  styleUrls: ['./people-picker.component.less']
})
export class PeoplePickerComponent implements OnInit {
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Output('onUserListChanges') usersSubject: Subject<User[]> = new Subject();
  
  suggestedUser: User[] = [];
  userControl = new FormControl();
  userList: User[] = [];
  userNames: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
  userControlSubscription: Subscription;
  userServiceSubscription: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userControlSubscription = this.userControl.valueChanges
      .pipe(
        tap(() => this.suggestedUser = []),
        debounceTime(800))
      .subscribe(input => {
        if(typeof input === 'string' && input.length > 2) {
          this.userServiceSubscription = this.userService.getUserByTyping(input)
            .subscribe(data => {
              this.suggestedUser = data.filter(dataUser => !this.userList.find(user => dataUser.name == user.name))
            })
        } else {
          this.suggestedUser = [];
        }
      })

    this.usersSubject
      .subscribe(users => {
        this.userNames = users.map(user => user.name)
      });
  }

  remove(userName: string): void {
    const user = this.userList.find(user => user.name === userName);
    this.userList.splice(this.userList.indexOf(user), 1);
    this.usersSubject.next(this.userList);
  }

  selected(e: MatAutocompleteSelectedEvent) {
    this.userList.push(e.option.value);
    this.usersSubject.next(this.userList);
    this.userInput.nativeElement.value = '';
    this.userControl.setValue(null);
    this.suggestedUser = [];
  }

  ngOnDestroy() {
    this.userControlSubscription.unsubscribe();
    this.userServiceSubscription && this.userServiceSubscription.unsubscribe();
  }

}
