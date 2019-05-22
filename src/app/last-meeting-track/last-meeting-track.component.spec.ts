import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMeetingTrackComponent } from './last-meeting-track.component';

describe('LastMeetingTrackComponent', () => {
  let component: LastMeetingTrackComponent;
  let fixture: ComponentFixture<LastMeetingTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastMeetingTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMeetingTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
