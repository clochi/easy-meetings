import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoGroupComponent } from './no-group/no-group.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewGroupFormComponent } from './new-group-form/new-group-form.component';

@NgModule({
  declarations: [NoGroupComponent, NewGroupFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    MaterialModule
  ]
})
export class GroupsModule { }
