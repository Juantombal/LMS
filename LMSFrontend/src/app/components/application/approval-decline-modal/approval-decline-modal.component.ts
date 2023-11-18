import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../../services/application.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-approval-decline-modal',
  templateUrl: './approval-decline-modal.component.html',
  styleUrls: ['./approval-decline-modal.component.css']
})
export class ApprovalDeclineModalComponent implements OnInit {
  signupForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private applicationService: ApplicationService,
    private userService: UserService,
    private dialogRef: MatDialogRef<ApprovalDeclineModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
  }

  createFormGroup = (): FormGroup => {
    let validators = [];
    if (this.data.action === 'decline' || (this.data.action === 'approve' && this.data.user.role === 'FIELDMANAGER')) {
      validators.push(Validators.required, Validators.minLength(2));
    }

    return new FormGroup({
      comment: new FormControl('', validators),
      status: new FormControl(),
    })
  }

  addApplicationLine = (applicationId: number, button: string) => {
    let statusValue = '';

    if (button === 'approve') {
      if (this.data.user.role === 'FIELDMANAGER') {
        statusValue = 'DIRECTOR';
      } else if (this.data.user.role === 'DIRECTOR') {
        statusValue = 'SECRETERIAT';
      } else if (this.data.user.role === 'SECRETERIAT') {
        statusValue = 'APPROVED';
      }
    } else {
      statusValue = 'DECLINED'
    }

    this.signupForm.patchValue({
      status: statusValue,
    });
    this.applicationService.postApplicationLine(applicationId, this.signupForm.value).subscribe((msg) => {
      if (statusValue === 'DIRECTOR') {
        this.userService.sendEmail("DIRECTOR", this.data.user).subscribe((msg) => {})
      } else if (statusValue === 'SECRETERIAT') {
        this.userService.sendEmail("SECRETERIAT", this.data.user).subscribe((msg) => {})
      }
      this.dialogRef.close(button)
    })
  }
}
