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
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatChipsModule,
  MatMenuModule
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
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule
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
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
