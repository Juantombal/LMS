import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCourseModalComponent } from './complete-course-modal.component';

describe('CompleteCourseModalComponent', () => {
  let component: CompleteCourseModalComponent;
  let fixture: ComponentFixture<CompleteCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteCourseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
