import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MeetingComponent } from '../meeting/meeting.component';
import { HttpClient } from '@angular/common/http';
import { meetings } from '../meeting/meeting.mock';

@Component({
  selector: 'em-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog, private http: HttpClient) {}
  title = 'easy-meetings';
  meetings: any;
  ngOnInit() {
    this.meetings = meetings;
  }

  createMeeting() {
    this.dialog.open(MeetingComponent, {
      width: '600px'
    });
  }
}
