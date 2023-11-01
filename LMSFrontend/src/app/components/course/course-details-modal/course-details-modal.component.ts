import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";
import {
  CourseApplicationModalComponent
} from "../../application/course-application-modal/course-application-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-details-modal',
  templateUrl: './course-details-modal.component.html',
  styleUrls: ['./course-details-modal.component.css']
})
export class CourseDetailsModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public course: Course,
    private dialogRef: MatDialogRef<CourseDetailsModalComponent>,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  courseApplication = () => {
    const dialogRefCourseApplication = this.dialog.open(CourseApplicationModalComponent, {data: this.course, autoFocus: false});

    dialogRefCourseApplication.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.dialogRef.close()
        this.router.navigate(['']);
      }
    });
  }
}
