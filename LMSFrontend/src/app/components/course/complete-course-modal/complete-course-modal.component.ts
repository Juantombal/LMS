import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";

@Component({
  selector: 'app-complete-course-modal',
  templateUrl: './complete-course-modal.component.html',
  styleUrls: ['./complete-course-modal.component.css']
})
export class CompleteCourseModalComponent implements OnInit {
  signupForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CompleteCourseModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
  }

  createFormGroup = (): FormGroup => {
    this.signupForm = new FormGroup({
      userId: new FormControl(),
      courseId: new FormControl(),
      completionDate: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    return this.signupForm;
  }

  createEmployeeCourse = (button: string) => {
    this.signupForm.patchValue({
      userId: this.data.user.id,
      courseId: this.data.courseRole.course.id,
    });

    this.courseService.postEmployeeCourse(this.signupForm.value).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }
}
