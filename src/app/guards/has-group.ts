import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class HasActiveGroup implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService) {}
  
  canActivate() {
    if(!this.userService.userInfo.activeGroup) {
      //this.router.navigate(['no-group']);
      return false;
    }
    return true;
  }

  hasActiveGroup() {
    
  }
}