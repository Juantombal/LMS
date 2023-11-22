import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEvaluationOverviewComponent } from './course-evaluation-overview.component';

describe('CourseEvaluationOverviewComponent', () => {
  let component: CourseEvaluationOverviewComponent;
  let fixture: ComponentFixture<CourseEvaluationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEvaluationOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEvaluationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
