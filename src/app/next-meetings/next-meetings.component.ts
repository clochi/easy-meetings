import { Component, OnInit, NgZone } from '@angular/core';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../classes/meeting.class';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    private ngZone: NgZone,
    private router: Router
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
  
  goMeeting(meetingId) {
    this.router.navigate([`app/meetings/${meetingId}`])
  }

  ngOnDestroy() {
    this.nextMeetingSubscription && this.nextMeetingSubscription.unsubscribe();
  }

}
