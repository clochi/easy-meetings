import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../classes/meeting.class';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'em-next-meetings',
  templateUrl: './next-meetings.component.html',
  styleUrls: ['./next-meetings.component.less']
})
export class NextMeetingsComponent implements OnInit {
  @Input() set meetings(meetingsData: Meeting[]) {
    if (!meetingsData.length) {
      this.meetingList = [];
    }
    this.meetingList = meetingsData
      .filter(meeting => meeting.status)
        .sort((prev, current) => prev.date.getTime() - current.date.getTime())
          .slice(0, 10);
    this.isLoading = false;
  }
  meetingList: Meeting[];
  isLoading = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
  }

  goMeeting(meetingId) {
    this.router.navigate([`app/meetings/${meetingId}`])
  }

}
