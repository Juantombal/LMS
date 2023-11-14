import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";
import {CourseService} from "../../../services/course.service";

@Component({
  selector: 'app-delete-course-modal',
  templateUrl: './delete-course-modal.component.html',
  styleUrls: ['./delete-course-modal.component.css']
})
export class DeleteCourseModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<DeleteCourseModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  setCourseInactive = (id: number, button: string) => {
    this.courseService.setCourseInactive(id).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }
}
