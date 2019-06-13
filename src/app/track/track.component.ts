import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../classes/track.class';

@Component({
  selector: 'em-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.less']
})
export class TrackComponent implements OnInit {
  @Input() track: Track;
  constructor() { }

  ngOnInit() {
  }

}
