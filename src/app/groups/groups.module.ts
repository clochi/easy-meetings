import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoGroupComponent } from './no-group/no-group.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  declarations: [NoGroupComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
