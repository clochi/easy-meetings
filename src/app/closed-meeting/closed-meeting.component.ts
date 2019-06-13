import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../classes/meeting.class';

@Component({
  selector: 'em-closed-meeting',
  templateUrl: './closed-meeting.component.html',
  styleUrls: ['./closed-meeting.component.less']
})
export class ClosedMeetingComponent implements OnInit {
  @Input() meeting: Meeting;
  constructor() { }

  ngOnInit() {
  }

}
