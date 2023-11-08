import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";

@Component({
  selector: 'app-edit-course-modal',
  templateUrl: './edit-course-modal.component.html',
  styleUrls: ['./edit-course-modal.component.css']
})
export class EditCourseModalComponent implements OnInit {
  signupForm: FormGroup
  courses: Course[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<EditCourseModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
    this.signupForm.patchValue(this.data)
    this.getCourses()
  }

  createFormGroup = (): FormGroup => {
    return new FormGroup({
      item: new FormControl('', [Validators.required, Validators.minLength(2)]),
      website: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl(''),
      type: new FormControl(''),
      costAmount: new FormControl(''),
      courseDays: new FormControl(''),
    })
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe({
        next: courses => {
          this.courses = courses
        },
      });
  }

  editCourse = (id: number, button: string) => {
    this.courseService.updateCourse(id, this.signupForm.value).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }
}
