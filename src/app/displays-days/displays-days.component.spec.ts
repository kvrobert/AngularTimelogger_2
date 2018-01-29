import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaysDaysComponent } from './displays-days.component';

describe('DisplaysDaysComponent', () => {
  let component: DisplaysDaysComponent;
  let fixture: ComponentFixture<DisplaysDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaysDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaysDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
