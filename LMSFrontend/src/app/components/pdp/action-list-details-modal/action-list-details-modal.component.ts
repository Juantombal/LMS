import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../model/user.model";
import {Application} from "../../../model/application.model";
import {CompleteCourseModalComponent} from "../../course/complete-course-modal/complete-course-modal.component";
import {EmployeeCourse} from "../../../model/employeecourse.model";
import {CourseService} from "../../../services/course.service";
import {EvaluationModalComponent} from "../../course/evaluation-modal/evaluation-modal.component";

@Component({
  selector: 'app-action-list-details-modal',
  templateUrl: './action-list-details-modal.component.html',
  styleUrls: ['./action-list-details-modal.component.css']
})
export class ActionListDetailsModalComponent implements OnInit {
  employeeCourse: EmployeeCourse[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Application,
    private dialogRef: MatDialogRef<ActionListDetailsModalComponent>,
    public dialog: MatDialog,
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.getEmployeeCourses()
  }

  courseCompletion = () => {
    if (this.data.course.type.includes('cursus') || this.data.course.type.includes('training')) {
      const dialogRefActionListDetails = this.dialog.open(EvaluationModalComponent, {data: this.data, autoFocus: false, maxHeight: '90vh'});

      dialogRefActionListDetails.afterClosed().subscribe(result => {
        if (result === 'A') {
          this.dialogRef.close()
        }
      });
    } else {
      const dialogRefActionListDetails = this.dialog.open(CompleteCourseModalComponent, {data: {
          course: this.data.course, user: this.data.user, applicationId: this.data.id}, autoFocus: false, maxHeight: '90vh'});

      dialogRefActionListDetails.afterClosed().subscribe(result => {
        if (result === 'A') {
          this.dialogRef.close()
        }
      });
    }
  }

  getEmployeeCourses = () => {
    this.courseService.getEmployeeCourseByUser(this.data.user.id).subscribe((employeeCourse) => {
      this.employeeCourse = employeeCourse
    })
  }

  isCourseApproved(employeeCourses: EmployeeCourse[], courseItem: string): boolean {
    const isCourseMatchingEmployeeCourse = employeeCourses.some(employeeCourse => employeeCourse.course.item === courseItem);
    const checkIfLastApplicationLineIsApproved = this.data.applicationLines[this.data.applicationLines.length - 1].status === 'APPROVED'

    return !(!isCourseMatchingEmployeeCourse && checkIfLastApplicationLineIsApproved);
  }
}
