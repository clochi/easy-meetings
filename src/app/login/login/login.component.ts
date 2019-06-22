import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
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
  sendingData = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService) { }

  onSubmit(form: NgForm) {
    this.sendingData = true;
    const loginInfo = {
      user: form.value.user,
      password: form.value.password
    }
    this.loginService.loginUser(loginInfo)
    .then(value => {
      this.ngZone.run(() => {
        this.router.navigate(['/app'])
      });
      //this.userService.getUserInfo(value.user.uid);
    })
    .catch(err => {
      alert('No se pudo logear ' + err);
      this.sendingData = false;
    });
  }

  ngOnInit() {
    //this.loginService.isLogged() && this.router.navigate(['app']);
  }

  ngOnDestroy() {
    this.sendingData = false
  }

}
