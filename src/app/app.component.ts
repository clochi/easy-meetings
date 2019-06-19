import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {

  get showToolbar() {
    return this.router.url !== '/' && this.router.url !== '/register';
  }
  constructor(
    private loginService: LoginService,
    private router: Router) {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
