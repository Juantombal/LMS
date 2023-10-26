import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.css']
})
export class AddCourseModalComponent implements OnInit {
  signupForm: FormGroup

  constructor(
    private courseService: CourseService,
    private dialogRef: MatDialogRef<AddCourseModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
  }

  createFormGroup = (): FormGroup => {
    return new FormGroup({
      item: new FormControl('', [Validators.required, Validators.minLength(2)]),
      website: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl(''),
      prio: new FormControl(''),
      type: new FormControl(''),
      costAmount: new FormControl(''),
      courseDays: new FormControl(''),
      role: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }

  addCourse = (button: string) => {
    this.courseService.postCourse(this.signupForm.value).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }

}
