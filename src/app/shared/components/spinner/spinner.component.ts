import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'em-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent implements OnInit {
  @Input() fullScreen: boolean;
  @Input() isLoading: boolean;
  @Input() message: string;
  constructor(private spinner: ElementRef) { }

  ngOnInit() {
    if(!this.hasOwnProperty('fullScreen')) {
      (<HTMLElement>this.spinner.nativeElement)
        .parentElement.style.position = 'relative';
    }
    
  }

  ngOnDestroy() {
    if(!this.hasOwnProperty('fullScreen')){
      (<HTMLElement>this.spinner.nativeElement)
        .parentElement.style.position = 'initial';
    }
  }

}
