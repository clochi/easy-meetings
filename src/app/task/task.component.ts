import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../classes/task.class';
import { TaskStatus } from '../constants';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Track } from '../classes/track.class';
import { TrackService } from '../services/track.service';
import { TaskService } from '../services/task.service';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'em-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() readOnly: boolean;
  showTracks = false;
  trackForm: FormGroup;
  tracksControl: FormArray;

  constructor(
    private trackService: TrackService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.createTracksForm();
    this.addInput();
  }

  createTracksForm() {
    this.trackForm = new FormGroup({
      tracks: new FormArray([])
    });
    this.tracksControl = (<FormArray>this.trackForm.get('tracks'));
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
    // if(this.readOnly !== undefined){
      return task.status == TaskStatus.finnished;
    // }
  }

  toggleTrack() {
    this.showTracks = !this.showTracks;
  }

  checkTask(e: MatCheckboxChange, taskId) {
    this.taskService.updateTask(taskId, e.checked);
  }

  addTracks() {
    const tracks: Track[] = (<Array<string>>this.tracksControl.value)
      .filter(trackData => trackData !== '')
        .map(trackData => {
          const track: Track = {
            taskId: this.task.id,
            meetingId: this.task.meetingId,
            info: trackData,
            date: new Date()
          } as Track
          return new Track(track);
        })
    
    this.trackService.saveTracks(tracks)
        .then(() => {
          this.createTracksForm();
          this.addInput();
        })
        .catch(err => {
          throw new Error(err);
        })
  }

}
