import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextMeetingsComponent } from './next-meetings.component';

describe('NextMeetingsComponent', () => {
  let component: NextMeetingsComponent;
  let fixture: ComponentFixture<NextMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
