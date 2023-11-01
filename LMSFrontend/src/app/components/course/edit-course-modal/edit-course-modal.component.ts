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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<EditCourseModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
    this.signupForm.patchValue(this.data)
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

  editCourse = (id: number, button: string) => {
    delete this.signupForm.value.item
    delete this.signupForm.value.website
    delete this.signupForm.value.description
    delete this.signupForm.value.type
    delete this.signupForm.value.costAmount
    delete this.signupForm.value.courseDays

    this.courseService.updateCourse(id, this.signupForm.value).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }

  editCourses = (item: string, button: string) => {
    delete this.signupForm.value.prio
    delete this.signupForm.value.role
    this.courseService.updateCourses(item, this.signupForm.value).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }
}
