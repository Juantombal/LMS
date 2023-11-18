import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CourseDetailsModalComponent} from "../course-details-modal/course-details-modal.component";
import {User} from "../../../model/user.model";
import {UserService} from "../../../services/user.service";
import {Observable, switchMap} from "rxjs";
import {CourseroleService} from "../../../services/courserole.service";
import {Courserole} from "../../../model/courserole.model";

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {
  loggedInUser: User;
  courseRoles: Courserole[] = [];
  filteredRoles: string[] = [];
  selectedRole: string;
  filteredCourses: Courserole[] = [];

  constructor(
    private courseRoleService: CourseroleService,
    public dialog: MatDialog,
    private userService: UserService,
  ) {  }

  ngOnInit(): void {
    this.userService.getUser()
      .pipe(
        switchMap((user) => {
          this.loggedInUser = user;
          return this.courseRoleService.getCourseRoles();
        })
      )
      .subscribe((courseRoles) => {
        this.courseRoles = courseRoles;
        this.filterRoles();

        this.selectedRole = this.loggedInUser.jobRole;

        this.filterCourses();
      });
  }

  getCourses(): void {
    this.courseRoleService.getCourseRoles()
      .subscribe({
        next: courseRoles => {
          this.courseRoles = courseRoles;
          this.filterCourses()
          this.filterRoles();
        },
      });
  }

  courseDetails = (courseRoles: Courserole) => {
    const dialogRefDatabaseDetails = this.dialog.open(CourseDetailsModalComponent, {data: {courseRoles: courseRoles, user: this.loggedInUser}, autoFocus: false, maxHeight: '90vh'});

    dialogRefDatabaseDetails.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }

  filterRoles(): void {
    if (this.courseRoles) {
      const uniqueRoles = Array.from(new Set(this.courseRoles.map(courseRole => courseRole.role.name)));
      this.filteredRoles = ['Alle rollen', ...uniqueRoles];
    }
  }

  filterCourses(): void {
    if (this.selectedRole === 'Alle rollen') {
      this.filteredCourses = this.courseRoles;
    } else if (this.selectedRole && this.courseRoles) {
      this.filteredCourses = this.courseRoles.filter(courseRole => courseRole.role.name === this.selectedRole);
    }


    if (this.selectedRole !== 'Alle rollen') {
      const sortOrder: { [key: string]: number } = {
        'Prio1': 1,
        'Prio2': 2,
        'Prio3': 3,
        'N/A': 4,
      };

      this.filteredCourses.sort((a, b) => {
        const prioA = sortOrder[a.prio] || 5; // Geef een hoge waarde (5) aan null en andere onbekende waarden
        const prioB = sortOrder[b.prio] || 5; // Geef een hoge waarde (5) aan null en andere onbekende waarden

        return prioA - prioB;
      });
    }

    if (this.selectedRole === 'Alle rollen') {
      this.filteredCourses = this.filteredCourses.sort((a, b) => {
        return a.role.name.localeCompare(b.role.name);
      });
    }
  }
}
