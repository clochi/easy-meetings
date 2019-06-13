import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../classes/task.class';
import { Meeting } from '../classes/meeting.class';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { Subscription } from 'rxjs';
import { User } from '../classes/user.class';
import { TaskStatus } from '../constants';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'em-open-meeting',
  templateUrl: './open-meeting.component.html',
  styleUrls: ['./open-meeting.component.less']
})
export class OpenMeetingComponent implements OnInit {
  @Input() meeting: Meeting;
  tasks: Task[] = [];
  taskForm: FormGroup;
  userListSubscription: Subscription
  userList: User[] = [];
  constructor(
    private taskService: TaskService,
    private groupService: GroupService,
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.userListSubscription = this.groupService.getActiveGroup()
      .subscribe(data => {
        (<Array<{}>>data.payload.data()['users'])
          .forEach(user => {
            this.userList.push(new User(user))
          })
      })
    this.taskForm = new FormGroup({})
    this.meeting.topics.forEach(topic => {
      this.taskForm.addControl(topic.id, new FormArray([]));
      this.addInput(topic.id);
    });
    this.taskForm.addControl('nextMeeting', new FormControl(''));
  }

  getControl(topicId) {
    return (<FormArray>this.taskForm.get(topicId));
  }

  addInput(topicId) {
    const topicTasks = (<FormArray>this.taskForm.get(topicId))
    if (topicTasks.controls.length) {
      topicTasks
        .push(new FormGroup({
          user: new FormControl(''),
          task: new FormControl('')})
        );
    } else {
      topicTasks
        .push(new FormGroup({
            user: new FormControl('', Validators.required),
            task: new FormControl('', Validators.required)
          })
        );
    }
  }

  userSelected(index, topicId) {
    if (this.getControl(topicId).controls[index + 1]) return;
    this.addInput(topicId)
    setTimeout(() => {
      document.querySelector(`.${CSS.escape(topicId)}`)
        .querySelector('.ng-pristine')
        .querySelector('input').focus();
    })
  }

  removeTask(index, topicId) {
    if (!this.getControl(topicId).controls[index + 1]) return;
    this.getControl(topicId).removeAt(index);
  }

  finishMeeting() {
    this.clearEmptyTopic();
    this.extractFormData();
    this.taskService.saveTasks(this.tasks)
      .then(() => {
        this.meetingService.meetings.doc(this.meeting.id)
          .update({status: false})
            .then(() => alert('La reunión se guardó correctamente'));
      })
    debugger
  }

  extractFormData() {
    const form = this.taskForm.controls;
    Object.keys(form)
      .forEach(key => {
        if(key !== 'nextMeeting') {
          form[key].value.forEach(taskData => {
            const task: Task = {
              assigned: taskData.user,
              task: taskData.task,
              topicId: key,
              date: new Date(),
              meetingId: this.meeting.id,
              status: TaskStatus.pending,
            } as Task;
            this.tasks.push(new Task(task))
          })
        }
        
      })
  }

  clearEmptyTopic() {
    const form = this.taskForm.controls;
    Object.keys(form)
      .forEach(key => {
        if(key !== 'nextMeeting') {
          form[key].value
            .forEach((item, i, arr) => {
              if(item.task == '') {
                arr.splice(i, 1)
              }
          });
        }
      })
  }
}
