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
import { isLogged } from './guards/login-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    MeetingItemComponent,
    LastMeetingTrackComponent,
    TopicComponent,
    TaskComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    isLogged,
    UserService,
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-ES'
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  entryComponents: [MeetingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
