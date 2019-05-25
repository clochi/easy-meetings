import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isLogged } from './guards/login-guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', data: {hideToolbar: true}, loadChildren: './login/login.module#LoginModule'},
  { path: 'app', data: {hideToolbar: false}, component: DashboardComponent, canActivate: [isLogged]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
