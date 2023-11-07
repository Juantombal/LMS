import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRoleLinkComponent } from './course-role-link.component';

describe('CourseRoleLinkComponent', () => {
  let component: CourseRoleLinkComponent;
  let fixture: ComponentFixture<CourseRoleLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseRoleLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseRoleLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
