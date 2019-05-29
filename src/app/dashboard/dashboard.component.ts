import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MeetingComponent } from '../meeting/meeting.component';
import { HttpClient } from '@angular/common/http';
import { meetings } from '../meeting/meeting.mock';

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
  ngOnInit() {
    this.meetings = meetings;
  }

  createMeeting() {
    this.ngZone.run(() => this.dialog.open(MeetingComponent, {
      width: '600px'
    }));
  }
}
