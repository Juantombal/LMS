import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../../model/course.model";
import {EmployeeCourse} from "../../../model/employeecourse.model";
import {CourseService} from "../../../services/course.service";
import {Courserole} from "../../../model/courserole.model";
import {CourseDetailsModalComponent} from "../course-details-modal/course-details-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CourseEvaluationDetailsComponent} from "../course-evaluation-details/course-evaluation-details.component";

@Component({
  selector: 'app-course-evaluation-overview',
  templateUrl: './course-evaluation-overview.component.html',
  styleUrls: ['./course-evaluation-overview.component.css']
})
export class CourseEvaluationOverviewComponent implements OnInit {
  course: Course;
  employeeCourses: EmployeeCourse[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.course = history.state;
    this.getEmployeeCourses()
  }

  getEmployeeCourses = () => {
    this.courseService.getEmployeeCourseByCourse(this.course.id).subscribe((employeeCourses) => {
      this.employeeCourses = employeeCourses
    })
  }

  courseEvaluationDetails = (employeeCourse: EmployeeCourse) => {
    this.dialog.open(CourseEvaluationDetailsComponent, {data: employeeCourse, autoFocus: false, maxHeight: '90vh'});
  }
}
