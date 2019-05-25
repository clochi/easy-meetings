import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RedirectLoggedDashboard } from '../guards/redirect-logged-dashboard';

const routes: Routes = [
  {path: '', component: LoginComponent} //, canActivate: [RedirectLoggedDashboard]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
