import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCourseDetailComponent } from './report-course-detail.component';

describe('ReportCourseDetailComponent', () => {
  let component: ReportCourseDetailComponent;
  let fixture: ComponentFixture<ReportCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
