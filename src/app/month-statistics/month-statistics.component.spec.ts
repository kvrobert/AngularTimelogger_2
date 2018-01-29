import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthStatisticsComponent } from './month-statistics.component';

describe('MonthStatisticsComponent', () => {
  let component: MonthStatisticsComponent;
  let fixture: ComponentFixture<MonthStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
