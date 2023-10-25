import { Component, OnInit } from '@angular/core';
import {Course} from "../../../model/course.model";
import {CourseService} from "../../../services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {CourseDetailsModalComponent} from "../course-details-modal/course-details-modal.component";

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {
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

  courseDetails = (course: Course) => {
    const dialogRefDatabaseDetails = this.dialog.open(CourseDetailsModalComponent, {data: course, autoFocus: false});

    dialogRefDatabaseDetails.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
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
}
