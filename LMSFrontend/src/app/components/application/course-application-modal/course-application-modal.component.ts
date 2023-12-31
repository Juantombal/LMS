import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";
import {User} from "../../../model/user.model";
import {UserService} from "../../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../../services/application.service";
import {Router} from "@angular/router";
import {Courserole} from "../../../model/courserole.model";

@Component({
  selector: 'app-course-application-modal',
  templateUrl: './course-application-modal.component.html',
  styleUrls: ['./course-application-modal.component.css']
})
export class CourseApplicationModalComponent implements OnInit {
  loggedInUser: User
  signupForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public courseRole: Courserole,
    private dialogRef: MatDialogRef<CourseApplicationModalComponent>,
    private userService: UserService,
    private applicationService: ApplicationService,
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.signupForm = this.createFormGroup()
  }

  getUser = () => {
    this.userService.getUser().subscribe((user) => {
      this.loggedInUser = user;
    })
  }

  createFormGroup = (): FormGroup => {
    this.signupForm = new FormGroup({
      userId: new FormControl(),
      courseId: new FormControl(),
      comment: new FormControl('', [Validators.required, Validators.minLength(2)]),
      startDate: new FormControl('', [Validators.required, Validators.minLength(2)]),
      endDate: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });

    return this.signupForm;
  }

  createApplication = (button: string) => {
    this.signupForm.patchValue({
      userId: this.loggedInUser.id,
      courseId: this.courseRole.course.id,
    });
    this.applicationService.postApplication(this.signupForm.value).subscribe((msg) => {
      this.userService.sendEmail("FIELDMANAGER", this.loggedInUser).subscribe((msg) => {})
      this.dialogRef.close(button)
    })
  }
}
