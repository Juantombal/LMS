import { Component, OnInit } from '@angular/core';
import {Course} from "../../../model/course.model";
import {CourseService} from "../../../services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {CourseDetailsModalComponent} from "../course-details-modal/course-details-modal.component";
import {AddCourseModalComponent} from "../add-course-modal/add-course-modal.component";
import {EditCourseModalComponent} from "../edit-course-modal/edit-course-modal.component";
import {DeleteCourseModalComponent} from "../delete-course-modal/delete-course-modal.component";

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  originalCourses: Course[] = [];
  courses: Course[] = [];
  selectedRole: string = 'Alle rollen';
  roles: string[] = [];

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
  ) {  }

  ngOnInit(): void {
    this.getCourses()
    this.roles = this.getUniqueRoles();
  }

  getUniqueRoles(): string[] {
    const uniqueRoles = Array.from(new Set(this.courses.map(course => course.role)));
    return ['Alle rollen', ...uniqueRoles];
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe({
        next: courses => {
          this.originalCourses = courses; // Sla de oorspronkelijke lijst op
          this.courses = courses;
          this.roles = this.getUniqueRoles();
        },
      });
  }

  filterCoursesByRole(): void {
    if (this.selectedRole === 'Alle rollen') {
      this.courses = this.originalCourses;
    } else if (this.selectedRole) {
      const selectedRole = this.selectedRole;
      this.courses = this.originalCourses.filter(course => course.role === selectedRole);
    }
  }

  addCourse = () => {
    const dialogRefAddCourse = this.dialog.open(AddCourseModalComponent, {autoFocus: false});

    dialogRefAddCourse.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }

  editCourse = (course: Course) => {
    const dialogRefEditCourse = this.dialog.open(EditCourseModalComponent, {data: course, autoFocus: false});

    dialogRefEditCourse.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }

  DeleteCourse = (course: Course) => {
    const dialogRefDeleteCourse = this.dialog.open(DeleteCourseModalComponent, {data: course, autoFocus: false});

    dialogRefDeleteCourse.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }
}
