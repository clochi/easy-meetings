import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { GoBackComponent } from './go-back/go-back.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SpinnerComponent, GoBackComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent,
    GoBackComponent,
    MaterialModule
  ]
})
export class SharedModule { }
