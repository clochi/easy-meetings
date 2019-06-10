import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../classes/task.class';
import { TaskStatus } from '../constants';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'em-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  @Input() task;
  @Input() readOnly: boolean;
  showTracks = false;
  trackForm: FormGroup;
  tracksControl: FormArray;

  constructor() { }

  ngOnInit() {
    this.trackForm = new FormGroup({
      tracks: new FormArray([])
    });
    this.tracksControl = (<FormArray>this.trackForm.get('tracks'));
    this.addInput();
  }

  addInput() {
    this.tracksControl.push(new FormControl(''));
  }

  enterPressed() {
    this.addInput();
    setTimeout(() => {
      document.querySelector('.tracks')
        .querySelector('.ng-pristine')
          .querySelector('input').focus();
    })
  }

  removeTrack(index) {
    if(!this.tracksControl.controls[index + 1]) return;
    this.tracksControl.removeAt(index);
  }

  isDone(task: Task) {
    if(this.readOnly !== undefined){
      return task.status === TaskStatus.finnished;
    }
  }

  toggleTrack() {
    this.showTracks = !this.showTracks;
  }

}
