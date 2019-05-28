import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../meeting/meeting.class';
import { Task } from '../classes/task.class';
import * as moment from 'moment';

@Component({
  selector: 'em-last-meeting-track',
  templateUrl: './last-meeting-track.component.html',
  styleUrls: ['./last-meeting-track.component.less']
})
export class LastMeetingTrackComponent implements OnInit {
  @Input() set meetings(meetings) {
    this.meeting = this.getLastMeetingClosed(meetings)
  }
  
  meeting: Meeting;
  tasks: Task[] = [];
  constructor() { }

  ngOnInit() {
  }

  getLastMeetingClosed(meetings) {
    const datesList = meetings.map(meeting => moment(meeting.date));
    const mayorDate = moment.max(datesList);
    return meetings
      .find(meeting => moment(mayorDate).isSame(moment(meeting.date)) && !meeting.status)
  }

}
