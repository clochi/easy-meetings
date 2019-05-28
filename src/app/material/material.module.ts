import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
