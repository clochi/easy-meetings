import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../classes/meeting.class';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'em-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private ngZone: NgZone,
    private meetingService: MeetingService) {}
  title = 'easy-meetings';
  isLoading = false;
  meetings: Meeting[] = [];
  dialogRef;
  meetingSubscription: Subscription;

  ngOnInit() {
    this.meetingSubscription = this.meetingService.getAllMeetings()
      .subscribe(meetings => {
        this.meetings = meetings;
      })
  }

  createMeeting() {
    this.ngZone.run(() => this.dialogRef = this.dialog.open(MeetingFormComponent, {
      width: '600px'
    }));
  }

  onDesetroy() {
    this.meetingSubscription && this.meetingSubscription.unsubscribe();
  }

}
