import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEvaluationDetailsComponent } from './course-evaluation-details.component';

describe('CourseEvaluationDetailsComponent', () => {
  let component: CourseEvaluationDetailsComponent;
  let fixture: ComponentFixture<CourseEvaluationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEvaluationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEvaluationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
