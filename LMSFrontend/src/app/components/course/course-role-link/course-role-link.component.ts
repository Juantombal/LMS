import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseroleService} from "../../../services/courserole.service";
import {Role} from "../../../model/role.model";
import {RoleService} from "../../../services/role.service";
import {Courserole} from "../../../model/courserole.model";

@Component({
  selector: 'app-course-role-link',
  templateUrl: './course-role-link.component.html',
  styleUrls: ['./course-role-link.component.css']
})
export class CourseRoleLinkComponent implements OnInit {
  signupForm: FormGroup
  roles: Role[] = [];
  courseRoles: Courserole[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private dialogRef: MatDialogRef<CourseRoleLinkComponent>,
    private courseRoleService: CourseroleService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
    this.getRoles()
    this.getCourseRoles()
  }

  createFormGroup = (): FormGroup => {
    return new FormGroup({
      courseId: new FormControl(),
      roleId: new FormControl(''),
      prio: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
        next: roles => {
          this.roles = roles;
        },
      });
  }

  getCourseRoles(): void {
    this.courseRoleService.getCourseRoleByCourse(this.data.id).subscribe({
      next: courseRoles => {
        this.courseRoles = courseRoles;
      },
    });
  }

  deleteCourseRole(courseRoleId: number): void {
    this.courseRoleService.deleteCourseRole(courseRoleId).subscribe((msg) => {
      this.getCourseRoles()
    })
  }

  linkRole = () => {
    this.signupForm.patchValue({
      courseId: this.data.id,
    });

    this.courseRoleService.postCourseRole(this.signupForm.value).subscribe((msg) => {
      this.getCourseRoles()
      this.signupForm.reset();
    })
  }

  checkRoleExistence(): boolean {
    const selectedRoleId = this.signupForm.get('roleId')?.value;

    return this.courseRoles.some(courseRole => courseRole.role.id == selectedRoleId);
  }
}
