import {Component, Inject, OnInit} from '@angular/core';
import {Course} from "../../../model/course.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CourseService} from "../../../services/course.service";
import {EmployeeCourse} from "../../../model/employeecourse.model";

@Component({
  selector: 'app-report-course-detail',
  templateUrl: './report-course-detail.component.html',
  styleUrls: ['./report-course-detail.component.css']
})
export class ReportCourseDetailComponent implements OnInit {
  employeeCourses: EmployeeCourse[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private dialogRef: MatDialogRef<ReportCourseDetailComponent>,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getEmployeeCourses()
  }

  getEmployeeCourses = () => {
    this.courseService.getEmployeeCourseByCourse(this.data.id).subscribe((employeeCourse) => {
      this.employeeCourses = employeeCourse
    })
  }

}
