import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoGroupComponent } from './no-group/no-group.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NoGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    MaterialModule
  ]
})
export class GroupsModule { }
