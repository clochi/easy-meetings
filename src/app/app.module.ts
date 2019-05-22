import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingItemComponent } from './meeting-item/meeting-item.component';
import { LastMeetingTrackComponent } from './last-meeting-track/last-meeting-track.component';
import { TopicComponent } from './topic/topic.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    MeetingItemComponent,
    LastMeetingTrackComponent,
    TopicComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-ES'
    }
  ],
  entryComponents: [MeetingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
