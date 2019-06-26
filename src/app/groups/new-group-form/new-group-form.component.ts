import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user.class';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/classes/group.class';
import { Router } from '@angular/router';

@Component({
  selector: 'em-new-group-form',
  templateUrl: './new-group-form.component.html',
  styleUrls: ['./new-group-form.component.less']
})
export class NewGroupFormComponent implements OnInit {
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  isSending = false;
  suggestedUser: User[] = [];
  userControl = new FormControl();
  userList: User[] = [];
  usersSubject: Subject<User[]> = new Subject();
  userNames: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
  userControlSubscription: Subscription;
  userServiceSubscription: Subscription;
  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.userControlSubscription = this.userControl.valueChanges
      .subscribe(input => {
        if(typeof input === 'string' && input.match('@')) {
          this.suggestedUser = [];
          this.userService.getUserByTyping(input)
            .subscribe(data => {
              const userExist = this.userList.find(user => data && user.email === data.email);
              data && !userExist && this.suggestedUser.push(data);
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

  createGroup(form) {
    this.isSending = true;
    const group = {
      name: form.value.name,
      users: this.userList.map(user => {
        const {groups, activeGroup, ...newUser } = user;
        return newUser;
      })
    } as Group;
    this.groupService.createGroup(group)
      .then(() => {
        const user = this.userService.userInfo;
        this.userService
          .updateUserInfo(user.id, {activeGroup: group.id})
            .then(() => {
              this.userList.push(user);
              const userList = this.userList.map(user => {
                const {activeGroup, ...userData} = user;
                return userData;
              }) as User[];
              this.userService
                .insertGroupInUsers(group, userList)
                  .then(() => {
                    this.router.navigate(['/app']);
                    alert('Se creó el grupo correctamente');
                  })
                  .catch(() => alert('Hubo un error al insertar el nuevo grupo en los usuarios'))
            })
            .catch(() => alert('Hubo un problema al activar el usuario'))
      })
      .catch(() => {
        alert('Hubo un error al crear el grupo')
        this.isSending = false;
      })
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
    this.userServiceSubscription.unsubscribe();
    this.isSending = false; 
  }

}

