import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { MeetingItemComponent } from './meeting-item/meeting-item.component';
import { LastMeetingTrackComponent } from './last-meeting-track/last-meeting-track.component';
import { TopicComponent } from './topic/topic.component';
import { TaskComponent } from './task/task.component';
import { isLogged } from './guards/login-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import localArg from '@angular/common/locales/es-AR';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from './shared/shared.module';
import { NextMeetingsComponent } from './next-meetings/next-meetings.component';
import { MeetingComponent } from './meeting/meeting.component';
import { OpenMeetingComponent } from './open-meeting/open-meeting.component';
import { ClosedMeetingComponent } from './closed-meeting/closed-meeting.component';

registerLocaleData(localArg);
@NgModule({
  declarations: [
    AppComponent,
    MeetingFormComponent,
    MeetingItemComponent,
    LastMeetingTrackComponent,
    TopicComponent,
    TaskComponent,
    DashboardComponent,
    NextMeetingsComponent,
    MeetingComponent,
    OpenMeetingComponent,
    ClosedMeetingComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    isLogged,
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-ES'
    },
    {provide: LOCALE_ID, useValue: 'es-AR'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  entryComponents: [MeetingFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
