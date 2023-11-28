import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  CourseApplicationModalComponent
} from "../../application/course-application-modal/course-application-modal.component";
import {Router} from "@angular/router";
import {EmployeeCourse} from "../../../model/employeecourse.model";
import {CourseService} from "../../../services/course.service";
import {Courserole} from "../../../model/courserole.model";
import {Application} from "../../../model/application.model";
import {ApplicationService} from "../../../services/application.service";

@Component({
  selector: 'app-course-details-modal',
  templateUrl: './course-details-modal.component.html',
  styleUrls: ['./course-details-modal.component.css']
})
export class CourseDetailsModalComponent implements OnInit {
  courseRole: Courserole;
  employeeCourse: EmployeeCourse[] = [];
  userApplications: Application[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourseDetailsModalComponent>,
    public dialog: MatDialog,
    private courseService: CourseService,
    private applicationService: ApplicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseRole = this.data.courseRoles
    this.getEmployeeCourses()
    this.getApplicationsByUser()
  }

  getApplicationsByUser(): void {
    this.applicationService.getApplicationByUser(this.data.user.id).subscribe(applications => {
      this.userApplications = applications
    })
  }

  evaluationOverview = () => {
    this.router.navigate(['/evaluation'], { state: this.courseRole.course });
    this.dialogRef.close()
  }

  getEmployeeCourses = () => {
    this.courseService.getEmployeeCourseByUser(this.data.user.id).subscribe((employeeCourse) => {
      this.employeeCourse = employeeCourse
    })
  }

  isCourseMatchingEmployeeCourse(employeeCourses: EmployeeCourse[], courseItem: string): boolean {
    return employeeCourses.some(employeeCourse => employeeCourse.course.item === courseItem);
  }

  hasUserApplied(employeeCourses: EmployeeCourse[], courseItem: string): boolean {
    return this.userApplications.some(application => application.course.item === courseItem &&
      application.applicationLines[application.applicationLines.length - 1].status !== 'DECLINED');
  }

  getCompletionDate(employeeCourses: EmployeeCourse[], courseItem: string): Date | null {
    const matchingEmployeeCourse = employeeCourses.find(employeeCourse => employeeCourse.course.item === courseItem);
    return matchingEmployeeCourse ? matchingEmployeeCourse.completionDate : null;
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
}
