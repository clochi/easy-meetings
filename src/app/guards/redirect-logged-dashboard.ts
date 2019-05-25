import { CanActivate } from "@angular/router/src/utils/preactivation";
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class RedirectLoggedDashboard implements CanActivate {
    path: import("@angular/router").ActivatedRouteSnapshot[];
    route: import("@angular/router").ActivatedRouteSnapshot;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private ngZone: NgZone) {}
        
    canActivate() {
        this.loginService.isLogged()
            .subscribe(user => {
                if(user) { this.ngZone.run(() => this.router.navigate(['/app'])) };
            })
        return true;  
    }
}