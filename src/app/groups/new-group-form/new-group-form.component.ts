import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/classes/group.class';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user.class';

@Component({
  selector: 'em-new-group-form',
  templateUrl: './new-group-form.component.html',
  styleUrls: ['./new-group-form.component.less']
})
export class NewGroupFormComponent implements OnInit {
  
  isSending = false;
  userList : User[] = [];

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private router: Router
  ) {  }

  ngOnInit() {
    
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

  updateUserList(userList) {
    this.userList = [...userList];
  }

  ngOnDestroy() {
    this.isSending = false; 
  }

}

