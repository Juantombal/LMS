import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseApplicationModalComponent } from './course-application-modal.component';

describe('CourseApplicationModalComponent', () => {
  let component: CourseApplicationModalComponent;
  let fixture: ComponentFixture<CourseApplicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseApplicationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
