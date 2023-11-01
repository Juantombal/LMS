import { Component, OnInit } from '@angular/core';
import {Course} from "../../../model/course.model";
import {CourseService} from "../../../services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {CourseDetailsModalComponent} from "../course-details-modal/course-details-modal.component";
import {User} from "../../../model/user.model";
import {UserService} from "../../../services/user.service";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {
  loggedInUser: User;
  originalCourses: Course[] = [];
  courses: Course[] = [];
  selectedRole: string = '';
  roles: string[] = [];

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
    private userService: UserService,
  ) {  }

  ngOnInit(): void {
    this.getCourses()
    this.roles = this.getUniqueRoles();
    this.userService.getUser()
      .pipe(
        switchMap((user) => {
          this.loggedInUser = user;
          this.selectedRole = this.loggedInUser.jobRole;
          return this.courseService.getCourses(); // Wacht op gebruikersgegevens en haal dan cursussen op
        })
      )
      .subscribe((courses) => {
        this.originalCourses = courses;
        this.courses = courses;
        this.filterCoursesByRole();
      });
  }

  getUniqueRoles(): string[] {
    const uniqueRoles = Array.from(new Set(this.courses.map(course => course.role)));
    return ['Alle rollen', ...uniqueRoles];
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe({
        next: courses => {
          this.originalCourses = courses;
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
      this.courses = this.originalCourses
    } else if (this.selectedRole) {
      const selectedRole = this.selectedRole;
      this.courses = this.originalCourses.filter(course => course.role === selectedRole)
      const sortOrder: { [key: string]: number } = {
        'Prio1': 1,
        'Prio2': 2,
        'Prio3': 3,
        'N/A': 4,
      };

      this.courses.sort((a, b) => {
        const prioA = sortOrder[a.prio] || 5; // Geef een hoge waarde (5) aan null en andere onbekende waarden
        const prioB = sortOrder[b.prio] || 5; // Geef een hoge waarde (5) aan null en andere onbekende waarden

        return prioA - prioB;
      });
    }
  }
}
