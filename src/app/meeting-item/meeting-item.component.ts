import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../meeting/meeting.class';

@Component({
  selector: 'em-meeting-item',
  templateUrl: './meeting-item.component.html',
  styleUrls: ['./meeting-item.component.less']
})
export class MeetingItemComponent implements OnInit {
  @Input() meeting: Meeting;
  constructor() { }

  ngOnInit() {
    
  }

}
