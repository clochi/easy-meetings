import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'em-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.less']
})
export class GoBackComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
  }

}
