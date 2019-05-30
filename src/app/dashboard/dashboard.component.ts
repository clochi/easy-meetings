import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';
import { HttpClient } from '@angular/common/http';
import { meetings } from '../meeting-form/meeting.mock';

@Component({
  selector: 'em-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private ngZone: NgZone) {}
  title = 'easy-meetings';
  isLoading = false;
  meetings: any;
  dialogRef;
  ngOnInit() {
    this.meetings = meetings;
  }

  createMeeting() {
    this.ngZone.run(() => this.dialogRef = this.dialog.open(MeetingFormComponent, {
      width: '600px'
    }));
  }
}
