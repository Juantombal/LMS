import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {ApplicationService} from "../../../services/application.service";

@Component({
  selector: 'app-evaluation-modal',
  templateUrl: './evaluation-modal.component.html',
  styleUrls: ['./evaluation-modal.component.css']
})
export class EvaluationModalComponent implements OnInit {
  signupForm: FormGroup
  stars: string[] = ['☆', '☆', '☆', '☆', '☆'];
  selectedStars = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EvaluationModalComponent>,
    private courseService: CourseService,
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

      evaluation: new FormGroup({
        instance: new FormControl(''),
        teacher: new FormControl(''),
        qualityCourse: new FormControl(0),
        speed: new FormControl(0),
        functioningTeacher: new FormControl(0),
        qualityExecution: new FormControl(0),
        time: new FormControl(0),
        enoughLearned: new FormControl(0),
        knowledgeTeacher: new FormControl(0),
        comments: new FormControl(''),
        learnings: new FormControl(''),
        missedAreas: new FormControl(''),
        strengthsTraining: new FormControl(''),
        weaknessesTraining: new FormControl(''),
        overallRating: new FormControl('')
      })
    });

    return this.signupForm;
  }

  updateRating(rating: number, fieldName: string) {
    this.signupForm.get(fieldName)?.patchValue(rating);
  }

  createEmployeeCourseAndEvaluation = (button: string) => {
    this.signupForm.patchValue({
      userId: this.data.user.id,
      courseId: this.data.course.id,
    });

    this.courseService.postEmployeeCourse(this.signupForm.value).subscribe((msg) => {})

    const applicationLineForm = new FormGroup({
      comment: new FormControl('Gefeliciteerd! 🎉 met het voltooien van de cursus! We zijn trots op je prestatie en moedigen je aan om je CV bij te werken met deze nieuwe vaardigheden en prestatie. Blijf groeien en excelleren!'),
      status: new FormControl('COMPLETED'),
    });

    this.applicationService.postApplicationLine(this.data.id, applicationLineForm.value).subscribe((msg) => {
      this.dialogRef.close(button);
    });
  }
}
