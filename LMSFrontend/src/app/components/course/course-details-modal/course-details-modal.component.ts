import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";

@Component({
  selector: 'app-course-details-modal',
  templateUrl: './course-details-modal.component.html',
  styleUrls: ['./course-details-modal.component.css']
})
export class CourseDetailsModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public course: Course,
    private dialogRef: MatDialogRef<CourseDetailsModalComponent>,
  ) { }

  ngOnInit(): void {
  }

}
