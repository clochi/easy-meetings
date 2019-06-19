import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'em-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  login = {
    email: null,
    name: null,
    password: null
  }
  loginSubscription: Subscription;
  sendingData = false;

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  onSubmit(form: NgForm) {
    this.sendingData = true;
    const loginInfo = {
      email: form.value.email,
      name: form.value.name,
      password: form.value.password
    }
    this.loginService.registerUser(loginInfo)
      .then(() => this.router.navigate(['/app']))
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.sendingData = false
  }
  
}
