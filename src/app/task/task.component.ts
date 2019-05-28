import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../classes/task.class';
import { TaskStatus } from '../constants';

@Component({
  selector: 'em-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  @Input() task;
  constructor() { }

  ngOnInit() {
  }

  isDone(task: Task) {
    return task.status === TaskStatus.finnished;
  }

}
