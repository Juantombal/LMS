import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";
import {
  CourseApplicationModalComponent
} from "../../application/course-application-modal/course-application-modal.component";
import {Router} from "@angular/router";
import {CompleteCourseModalComponent} from "../complete-course-modal/complete-course-modal.component";
import {EmployeeCourse} from "../../../model/employeecourse.model";
import {CourseService} from "../../../services/course.service";
import {Courserole} from "../../../model/courserole.model";

@Component({
  selector: 'app-course-details-modal',
  templateUrl: './course-details-modal.component.html',
  styleUrls: ['./course-details-modal.component.css']
})
export class CourseDetailsModalComponent implements OnInit {
  courseRole: Courserole;
  employeeCourse: EmployeeCourse[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourseDetailsModalComponent>,
    public dialog: MatDialog,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseRole = this.data.courseRoles
    this.getEmployeeCourses()
  }

  courseApplication = () => {
    const dialogRefCourseApplication = this.dialog.open(CourseApplicationModalComponent, {data: this.courseRole, autoFocus: false});

    dialogRefCourseApplication.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.dialogRef.close()
        this.router.navigate(['']);
      }
    });
  }

  getEmployeeCourses = () => {
    this.courseService.getEmployeeCourseByUser(this.data.user.id).subscribe((employeeCourse) => {
      this.employeeCourse = employeeCourse
    })
  }

  isCourseMatchingEmployeeCourse(employeeCourses: EmployeeCourse[], courseItem: string): boolean {
    return employeeCourses.some(employeeCourse => employeeCourse.course.item === courseItem);
  }

  getCompletionDate(employeeCourses: EmployeeCourse[], courseItem: string): Date | null {
    const matchingEmployeeCourse = employeeCourses.find(employeeCourse => employeeCourse.course.item === courseItem);
    return matchingEmployeeCourse ? matchingEmployeeCourse.completionDate : null;
  }
}
