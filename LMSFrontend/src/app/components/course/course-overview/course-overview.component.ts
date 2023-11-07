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
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
    private userService: UserService,
  ) {  }

  ngOnInit(): void {
    this.getCourses()
    this.userService.getUser()
      .pipe(
        switchMap((user) => {
          this.loggedInUser = user;
          return this.courseService.getCourses(); // Wacht op gebruikersgegevens en haal dan cursussen op
        })
      )
      .subscribe((courses) => {
        this.courses = courses;
      });
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe({
        next: courses => {
          this.courses = courses;
        },
      });
  }

  courseDetails = (course: Course) => {
    const dialogRefDatabaseDetails = this.dialog.open(CourseDetailsModalComponent, {data: {course: course, user: this.loggedInUser}, autoFocus: false});

    dialogRefDatabaseDetails.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }
}
