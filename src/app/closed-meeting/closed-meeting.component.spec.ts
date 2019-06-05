import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedMeetingComponent } from './closed-meeting.component';

describe('ClosedMeetingComponent', () => {
  let component: ClosedMeetingComponent;
  let fixture: ComponentFixture<ClosedMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
