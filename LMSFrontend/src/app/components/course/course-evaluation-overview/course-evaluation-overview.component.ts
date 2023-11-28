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
  sortColumn: string = '';
  isReverseSort: boolean = false;

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

  handleStarClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  getAverageOverallRating(): number {
    if (this.employeeCourses.length === 0) {
      return 0;
    }
    const sum = this.employeeCourses.reduce((total, course) => total + course.evaluation.overallRating, 0);
    return sum / this.employeeCourses.length;
  }

  sortByColumn(columnName: string) {
    if (this.sortColumn === columnName) {
      this.isReverseSort = !this.isReverseSort;
    } else {
      this.sortColumn = columnName;
      this.isReverseSort = false;
    }

    this.employeeCourses.sort((a, b) => {
      const aValue = this.getPropertyValue(a, columnName);
      const bValue = this.getPropertyValue(b, columnName);

      if (aValue < bValue) {
        return this.isReverseSort ? 1 : -1;
      }
      if (aValue > bValue) {
        return this.isReverseSort ? -1 : 1;
      }
      return 0;
    });
  }

  getPropertyValue(obj: any, propName: string): any {
    const props = propName.split('.');
    let value = obj;
    for (const prop of props) {
      value = value[prop];
    }
    return value;
  }
}
