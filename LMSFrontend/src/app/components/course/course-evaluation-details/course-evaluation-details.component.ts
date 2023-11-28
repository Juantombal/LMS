import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeCourse} from "../../../model/employeecourse.model";

@Component({
  selector: 'app-course-evaluation-details',
  templateUrl: './course-evaluation-details.component.html',
  styleUrls: ['./course-evaluation-details.component.css']
})
export class CourseEvaluationDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmployeeCourse,
  ) { }

  ngOnInit(): void {
  }

  handleStarClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
