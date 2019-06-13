import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { GoBackComponent } from './go-back/go-back.component';
import { MaterialModule } from '../material/material.module';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  declarations: [SpinnerComponent, GoBackComponent, MomentPipe],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent,
    GoBackComponent,
    MaterialModule,
    MomentPipe
  ]
})
export class SharedModule { }
