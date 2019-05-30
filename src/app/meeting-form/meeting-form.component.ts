import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Meeting } from '../classes/meeting.class';
import { Topic } from '../classes/topic.class';
import { MeetingService } from '../services/meeting.service';
import { TopicService } from '../services/topic.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'em-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.less']
})
export class MeetingFormComponent implements OnInit {

  constructor(
    private meetingService: MeetingService,
    private topicService: TopicService,
    private dialogRef: MatDialogRef<MeetingFormComponent>) { }

  isSending = false;
  meetingForm: FormGroup;
  meeting: Meeting;
  topics: Topic[] = [];
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
    if((<any>e.currentTarget).value && (e.keyCode == 13 || e.which == 13) ) {
      (<any>e.currentTarget).disabled = true;
      this.addTopic();
      setTimeout(() => {
        document.querySelector('.topics')
          .querySelector('.ng-pristine')
            .querySelector('input').focus();
      })
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
    this.isSending = true;
    this.clearEmptyTopic();
    this.extractFormData();
    this.meetingService.saveMeeting(this.meeting.toPlain())
      .then(meeting => {
        this.topicsControl.controls.forEach(control => {
          const topic = {
            meetingId: meeting.id,
            topic: control.value
          } as Topic
          this.topics.push(new Topic(topic))
        });
        meeting.update({id: meeting.id});
        
        this.topicService.saveTopics(this.topics)
          .then(() => {
            this.isSending = false;
            this.dialogRef.close();
            alert('Todo se guardó correctamente')
          })
          .catch(() => alert('Algo salió mal al guardar los temas'))
      })
      .catch(() => alert('Algo salió mal al crear la reunión'))
  }

  extractFormData() {
    const form = this.meetingForm.controls;
    const formData = {
      date: form.date.value,
      place: form.place.value,
      time: form.time.value,
      users: form.users.value
    } as Meeting
    this.meeting = new Meeting(formData);
  }

  clearEmptyTopic() {
    this.topicsControl.controls
      .forEach((item, i, arr) => {
        if(item.value == '') {
          arr.splice(i, 1)
        }
      });
  }
}
