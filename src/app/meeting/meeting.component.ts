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
  topicsControl;
  ngOnInit() {
    this.meetingForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      topics: new FormArray([]),
      place: new FormControl(null, Validators.required),
      users: new FormControl(null, Validators.required)
    })
    this.topicsControl = (<FormArray>this.meetingForm.get('topics'));
    this.addTopic();
  }
  
  addTopic() {
    this.topicsControl.push(new FormControl(''));
  }

  enterPressed(e: KeyboardEvent) {
    if(e.keyCode == 13 || e.which == 13) { 
      this.addTopic();
      (<any>e.currentTarget).disabled = true;
      //this.topicsControl.controls[this.topicsControl.controls.length -1];
    };
  }

  haveTopic() {
       return this.topicsControl.controls[0].value != '';
  }

  removeTopic(index) {
    if(index == 0  && this.topicsControl.controls.length < 2) return;
    this.topicsControl.removeAt(index);
  }

  onSubmit() {
    console.log(this.meetingForm.controls)
  }


}
