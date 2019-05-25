import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Meeting, Topic } from './meeting.class';

@Component({
  selector: 'em-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.less']
})
export class MeetingComponent implements OnInit {

  constructor() { }
  meetingForm: FormGroup;
  meeting: Meeting;

  ngOnInit() {
    this.meetingForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      topics: new FormArray([]),
      place: new FormControl(null, Validators.required),
      users: new FormControl(null, Validators.required)
    })
    this.addTopic();
  }

  haveTopic() {
       return (<FormArray>this.meetingForm.get('topics')).controls[0].value != '';
  }

  onSubmit() {
    console.log(this.meetingForm.controls)
  }

  addTopic() {
    (<FormArray>this.meetingForm.get('topics')).push(new FormControl(''));
  }

}
