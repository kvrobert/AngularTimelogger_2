import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaysTasksComponent } from './displays-tasks.component';

describe('DisplaysTasksComponent', () => {
  let component: DisplaysTasksComponent;
  let fixture: ComponentFixture<DisplaysTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaysTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaysTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
