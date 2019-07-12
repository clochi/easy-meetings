import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { GoBackComponent } from './go-back/go-back.component';
import { MaterialModule } from '../material/material.module';
import { MomentPipe } from './pipes/moment.pipe';
import { PeoplePickerComponent } from './components/people-picker/people-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupListComponent } from './components/group-list/group-list.component';

@NgModule({
  declarations: [SpinnerComponent, GoBackComponent, MomentPipe, PeoplePickerComponent, GroupListComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    SpinnerComponent,
    GoBackComponent,
    MaterialModule,
    MomentPipe,
    PeoplePickerComponent,
    GroupListComponent
  ]
})
export class SharedModule { }
