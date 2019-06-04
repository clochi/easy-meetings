import { Component, OnInit, NgZone } from '@angular/core';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../classes/meeting.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'em-next-meetings',
  templateUrl: './next-meetings.component.html',
  styleUrls: ['./next-meetings.component.less']
})
export class NextMeetingsComponent implements OnInit {

  meetings: Meeting[] = [];
  nextMeetingSubscription: Subscription;
  isLoading = false;
  constructor(
    private meetingService: MeetingService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.nextMeetingSubscription = this.meetingService.getNextMeetings()
      .subscribe(meetings => {
        this.ngZone.run(() => {
          this.meetings = meetings;
          this.isLoading = false;
        })
      })
  }

  ngOnDestroy() {
    this.nextMeetingSubscription.unsubscribe();
  }

}
