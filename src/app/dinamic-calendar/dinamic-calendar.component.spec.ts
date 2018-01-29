import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicCalendarComponent } from './dinamic-calendar.component';

describe('DinamicCalendarComponent', () => {
  let component: DinamicCalendarComponent;
  let fixture: ComponentFixture<DinamicCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinamicCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
