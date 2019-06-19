import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authFire: AngularFireAuth,
    private userService: UserService) { }

  loginUser(login) {
    return this.authFire.auth.signInWithEmailAndPassword(login.user, login.password)
      .then(value => {
        this.userService.getUserInfo(value.user.uid);
      })
      .catch(err => alert('No se pudo logear ' + err));
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

  isLogged(): Observable<boolean>{
    return new Observable(observer => {
      this.authFire.auth.onAuthStateChanged( user => {
        if(user && !this.userService.userInfo) {
          this.userService.getUserInfo(user.uid)
            .subscribe(() => observer.next(true));
        } else {
          observer.next(!!user);
        }
      });
    })
  };

  logout() {
    this.authFire.auth.signOut();
  }

}
