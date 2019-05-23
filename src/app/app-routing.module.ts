import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isLogged } from './guards/login-guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginModule'},
  { path: 'app', component: HomeComponent, canActivate: [isLogged]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
