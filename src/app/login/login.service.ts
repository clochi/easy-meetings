import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';
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
          this.userService.syncUser()
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

  isLogged(): boolean {
    return !!this.userService.userInfo;
  };

  logout() {
    this.authFire.auth.signOut();
    this.userService.userInfo = undefined;
  }

}
