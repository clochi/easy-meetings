import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../classes/user.class';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private authFire: AngularFireAuth,
    private userService: UserService) { }

  loginUser(login) {
    return new Promise((resolve, reject) => {
      this.authFire.auth.signInWithEmailAndPassword(login.user, login.password)
        .then((value) => {
          this.initializeUser()
            .then(() => {
              resolve();
            })
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  registerUser(login) {
    return this.authFire.auth.createUserWithEmailAndPassword(login.email, login.password)
      .then(user => {
        login.id = user.user.uid;
        login.groups = [];
        login.activeGroup = null;
        delete login.password;
        return this.userService.saveUser(login);
      })
  }

  initializeUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authFire.authState
        .pipe(take(1))
          .subscribe(user => {
            if(user) {
              this.userService.getUserInfo(user.uid)
                .pipe(take(1))
                .subscribe(userData => {
                  this.userService.userInfo = new User(userData);
                  resolve();
                })
            } else {
              resolve();
            }
          })
    })
  }

  isLogged(): boolean {
    return !!this.userService.userInfo;
  };

  logout() {
    this.authFire.auth.signOut();
    this.userService.userInfo = undefined;
  }

}
