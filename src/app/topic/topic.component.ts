import { Component, OnInit, Input } from '@angular/core';
import { TaskStatus } from '../constants';
import { Task } from '../meeting/meeting.class';

@Component({
  selector: 'em-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.less']
})
export class TopicComponent implements OnInit {
  @Input() topic;
  showTasks = false;
  constructor() { }

  ngOnInit() {
  }

  isDone(tasks: Task[]) {
    return tasks.every(task => task.status === TaskStatus.finnished);
  }

  toggle() {
    this.showTasks = !this.showTasks;
  }

}
