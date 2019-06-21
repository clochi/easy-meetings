import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoGroupComponent } from './no-group/no-group.component';

const routes: Routes = [
  { path: '' },
  { path: 'no-group', component: NoGroupComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GroupsRoutingModule {}