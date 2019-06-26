import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoGroupComponent } from './no-group/no-group.component';
import { MyGroupsComponent } from './my-groups/my-groups.component';

const routes: Routes = [
  { path: '', component: MyGroupsComponent },
  { path: 'no-group', component: NoGroupComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GroupsRoutingModule {}