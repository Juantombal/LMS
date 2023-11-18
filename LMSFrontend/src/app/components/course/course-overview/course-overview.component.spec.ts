import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOverviewComponent } from './course-overview.component';
import {MatDialog} from "@angular/material/dialog";
import {CourseroleService} from "../../../services/courserole.service";
import {Courserole} from "../../../model/courserole.model";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user.model";
import {of} from "rxjs";

describe('CourseOverviewComponent', () => {
  let component: CourseOverviewComponent;
  let fixture: ComponentFixture<CourseOverviewComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockCourseRoleService: jasmine.SpyObj<CourseroleService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    jobRole: 'Some Job Role',
    role: 'Some Role',
    pdp: {
      id: 1,
      background: 'Some background',
      present: 'Some present',
      future: 'Some future',
      futureRole: []
    }
  };

  const mockCourseRoles: Courserole[] = [

  ];

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockCourseRoleService = jasmine.createSpyObj('CourseroleService', ['getCourseRoles']);
    mockUserService = jasmine.createSpyObj('UserService', ['getUser']);

    await TestBed.configureTestingModule({
      declarations: [CourseOverviewComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: CourseroleService, useValue: mockCourseRoleService },
        { provide: UserService, useValue: mockUserService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOverviewComponent);
    component = fixture.componentInstance;

    mockCourseRoleService.getCourseRoles.and.returnValue(of(mockCourseRoles));
    mockUserService.getUser.and.returnValue(of(mockUser));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should filter roles correctly', () => {
    // Mock course roles data
    component.courseRoles = mockCourseRoles;

    component.filterRoles();

    expect(component.filteredRoles).toEqual(['Alle rollen', /* expected unique roles */]);
  });
});
