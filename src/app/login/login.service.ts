import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authFire: AngularFireAuth) { }

  loginUser(login) {
    return this.authFire.auth.signInWithEmailAndPassword(login.user, login.password)
      .then(value => alert('logeó ' + value.user.email))
      .catch(err => alert('No se pudo logear ' + err));
  }

  isLogged(): Observable<boolean>{
    return new Observable(observer => {
      this.authFire.auth.onAuthStateChanged( user => {
        user ? observer.next(true) : observer.next(false);
      });
    })
  };

  logout() {
    this.authFire.auth.signOut();
  }

}
