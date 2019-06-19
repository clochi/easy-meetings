import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../classes/meeting.class';

@Component({
  selector: 'em-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.less']
})
export class MeetingComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private meetingService: MeetingService,
    private ngZone: NgZone,
    
  ) { }

  paramSubscription: Subscription;
  meetingServiceSubscription: Subscription;
  meeting: Meeting;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.paramSubscription = this.activeRoute.params
      .subscribe(param => {
        this.meetingServiceSubscription = this.meetingService.getMeeting(param.id)
          .subscribe(data => {
            this.ngZone.run(() => {
              this.isLoading = false;
              this.meeting = data;
            })
          })
      })
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
    this.meetingServiceSubscription.unsubscribe();
  }

}
