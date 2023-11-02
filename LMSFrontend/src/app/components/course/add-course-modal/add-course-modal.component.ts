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
  selectedCourse: Course | null;
  courses: Course[];
  uniqueRoles: string[] = [];
  inputVisible = false;

  constructor(
    private courseService: CourseService,
    private dialogRef: MatDialogRef<AddCourseModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
    this.getCourses()
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe({
        next: courses => {
          this.courses = this.removeDuplicates(courses)
          this.courses.sort((a, b) => a.item.localeCompare(b.item));
          this.getUniqueRoles()
        },
      });
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
      role: new FormControl('', ),
    })
  }

  selectCourse() {
    if (this.selectedCourse) {
      this.signupForm.patchValue({
        item: this.selectedCourse.item,
        website: this.selectedCourse.website,
        description: this.selectedCourse.description,
        costAmount: this.selectedCourse.costAmount,
        type: this.selectedCourse.type,
        courseDays: this.selectedCourse.courseDays
      });
    }
  }

  removeDuplicates(courses: Course[]): Course[] {
    const courseMap = new Map<string, Course>();

    for (const course of courses) {
      if (!courseMap.has(course.item)) {
        courseMap.set(course.item, course);
      }
    }

    return Array.from(courseMap.values());
  }

  getUniqueRoles(): void {

    const rolesSet = new Set<string>();
    for (const course of this.courses) {
      rolesSet.add(course.role);
    }
    this.uniqueRoles = Array.from(rolesSet);
  }

  addCourse = (button: string) => {
    this.courseService.postCourse(this.signupForm.value).subscribe((msg) => {
      if (button === 'A'){
        this.dialogRef.close(button)
      }
    })
  }

  toggleRoleInput(): void {
    this.inputVisible = !this.inputVisible;
  }

}
