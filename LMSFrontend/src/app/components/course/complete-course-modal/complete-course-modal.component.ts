import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {ApplicationService} from "../../../services/application.service";

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
    private applicationService: ApplicationService,
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
      courseId: this.data.course.id,
    });

    this.courseService.postEmployeeCourse(this.signupForm.value).subscribe((msg) => {})

    const applicationLineForm = new FormGroup({
      comment: new FormControl('Gefeliciteerd! 🎉 met het voltooien van de cursus! We zijn trots op je prestatie en moedigen je aan om je CV bij te werken met deze nieuwe vaardigheden en prestatie. Blijf groeien en excelleren!'),
      status: new FormControl('COMPLETED'),
    });

    console.log(this.data.applicationLines)
    this.applicationService.postApplicationLine(this.data.applicationId, applicationLineForm.value).subscribe((msg) => {
      this.dialogRef.close(button);
    });
  }
}
