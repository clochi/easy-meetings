import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../classes/meeting.class';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'em-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.less']
})
export class MeetingComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private meetingService: MeetingService,
    private changeDetector: ChangeDetectorRef,
    private taskService: TaskService
  ) { }

  paramSubscription: Subscription;
  meeting: Meeting;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.paramSubscription = this.activeRoute.params
      .subscribe(param => {
        this.meetingService.getMeeting(param.id)
          .subscribe(data => {
            this.isLoading = false;
            this.meeting = data;
            this.changeDetector.detectChanges();
          })
      })
  }

  addTask(topicId: string) {
    
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
