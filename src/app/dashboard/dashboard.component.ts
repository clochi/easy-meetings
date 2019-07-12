import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../classes/meeting.class';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { UserService } from '../services/user.service';

@Component({
  selector: 'em-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private ngZone: NgZone,
    private meetingService: MeetingService,
    private userService: UserService) {}
  title = 'easy-meetings';
  isLoading = false;
  meetings: Meeting[] = [];
  dialogRef;
  meetingSubscription: Subscription;

  ngOnInit() {
    this.meetingSubscription = this.userService.getMyUserInfo()
      .subscribe(() => {
        this.meetingService.getAllMeetings()
        .pipe(take(1))
        .subscribe(meetings => {
          this.meetings = meetings;
        })
      })
  }

  createMeeting() {
    this.ngZone.run(() => this.dialogRef = this.dialog.open(MeetingFormComponent, {
      width: '600px'
    }));
  }

  ngOnDestroy() {
    this.meetingSubscription && this.meetingSubscription.unsubscribe();
  }

}
