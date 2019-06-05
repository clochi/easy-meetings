import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../classes/task.class';
import { Meeting } from '../classes/meeting.class';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'em-open-meeting',
  templateUrl: './open-meeting.component.html',
  styleUrls: ['./open-meeting.component.less']
})
export class OpenMeetingComponent implements OnInit {
  @Input() meeting: Meeting;
  tasks: Task[] = [];
  taskForm: FormGroup;
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskForm = new FormGroup({})
    this.meeting.topics.forEach(topic => {
      this.taskForm.addControl(topic.id, new FormArray([]));
      this.addInput(topic.id);
    })
  }

  getControl(topicId) {
    return (<FormArray>this.taskForm.get(topicId));
  }

  addInput(topicId) {
    (<FormArray>this.taskForm.get(topicId)).push(new FormGroup({user: new FormControl(''), task: new FormControl('')}))//.push(new FormControl(''));
  }

  addTask(topicId: string) {
    alert(topicId)
  }

  enterPressed(e: KeyboardEvent, topicId, topicItem) {
    if((<any>e.currentTarget).value && (e.keyCode == 13 || e.which == 13)) {
      (<any>e.currentTarget).disabled = true;
      if(topicItem) { this.addInput(topicId) };
      setTimeout(() => {
        document.querySelector(`.${CSS.escape(topicId)}`)
          .querySelector('.ng-pristine')
            .querySelector('input').focus();
      })
    };
  }

  removeTopic(index, topicId, item) {
    const inputElement = (<HTMLInputElement>document.querySelector(`.${CSS.escape(topicId)}`)
      .querySelector(`input[id=${CSS.escape(topicId+index)}]`))
    if(!inputElement.disabled) return;
    this.getControl(topicId).removeAt(index);
  }

}
