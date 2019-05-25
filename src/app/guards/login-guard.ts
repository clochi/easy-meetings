import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class isLogged implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(
    private loginService: LoginService,
    private router: Router) {}
  
  canActivate() {
    return this.loginService.isLogged();
  }
}