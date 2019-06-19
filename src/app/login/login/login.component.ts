import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'em-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  login = {
    user: null,
    password: null
  }
  loginSubscription: Subscription;
  sendingData = false;

  constructor(
    private loginService: LoginService,
    private ngZone: NgZone,
    private router: Router,
    private userService: UserService) { }

  onSubmit(form: NgForm) {
    this.sendingData = true;
    const loginInfo = {
      user: form.value.user,
      password: form.value.password
    }
    this.loginService.loginUser(loginInfo)
    .then(value => {
      this.userService.getUserInfo(value.user.uid);
    })
    .catch(err => {
      alert('No se pudo logear ' + err);
      this.sendingData = false;
    });
  }

  ngOnInit() {
    this.loginSubscription = this.loginService.isLogged()
      .subscribe(logged => {
        if(logged) {this.ngZone.run(() => this.router.navigate(['app']))};
      })
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.sendingData = false
  }

}
