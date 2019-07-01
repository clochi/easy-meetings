import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoGroupComponent } from './no-group/no-group.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewGroupFormComponent } from './new-group-form/new-group-form.component';
import { MyGroupsComponent } from './my-groups/my-groups.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NoGroupComponent, NewGroupFormComponent, MyGroupsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class GroupsModule { }

