import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

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
  constructor(
    private loginService: LoginService,
    private ngZone: NgZone,
    private router: Router) { }

  onSubmit(form: NgForm) {
    const loginInfo = {
      user: form.value.user,
      password: form.value.password
    }
    this.loginService.loginUser(loginInfo)
  }

  ngOnInit() {
    this.loginService.isLogged()
      .subscribe(logged => {
        if(logged) {this.ngZone.run(() => this.router.navigate(['app']))};
      })
  }

}
