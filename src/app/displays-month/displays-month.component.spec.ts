import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaysMonthComponent } from './displays-month.component';

describe('DisplaysMonthComponent', () => {
  let component: DisplaysMonthComponent;
  let fixture: ComponentFixture<DisplaysMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaysMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaysMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
