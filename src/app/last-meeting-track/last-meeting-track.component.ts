import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Meeting } from '../classes/meeting.class';
import { Task } from '../classes/task.class';
import * as moment from 'moment';
import { MeetingService } from '../services/meeting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'em-last-meeting-track',
  templateUrl: './last-meeting-track.component.html',
  styleUrls: ['./last-meeting-track.component.less']
})
export class LastMeetingTrackComponent implements OnInit {
  meetingSubscription: Subscription
  @Input() set meetings(meets) {
    if(meets.length && (this.meeting = this.getLastMeetingClosed(meets))) {
      this.isLoading = true;
      this.meetingSubscription = this.meetingService.getMeeting(this.meeting.id)
        .subscribe(meeting => {
          this.meeting = meeting;
          this.isLoading = false;
        });
    }
  };
  
  meeting: Meeting;
  tasks: Task[] = [];
  isLoading = false;
  constructor(
    private meetingService: MeetingService,
    private ngZone: NgZone) { }

  ngOnInit() {
  }

  getLastMeetingClosed(meetings) {
    const datesList = meetings
      .filter(meeting => !meeting.status)
        .map(meeting => moment(meeting.date));
    const mayorDate = moment.max(datesList);
    return meetings
      .find(meeting => moment(mayorDate).isSame(moment(meeting.date)))
  }

  ngOnDestroy() {
    this.meetingSubscription && this.meetingSubscription.unsubscribe();
  }

}
