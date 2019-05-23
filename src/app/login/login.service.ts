import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

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

  isLogged() : Observable<any>{
    return Observable.create( observer => {
      this.authFire.auth.onAuthStateChanged( user => {
        observer.next(user ? true : false);
        observer.complete();
      })
    })
  }
}
