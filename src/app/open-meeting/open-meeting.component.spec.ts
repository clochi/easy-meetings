import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMeetingComponent } from './open-meeting.component';

describe('OpenMeetingComponent', () => {
  let component: OpenMeetingComponent;
  let fixture: ComponentFixture<OpenMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
