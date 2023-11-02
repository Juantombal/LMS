import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../../services/application.service";

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
    private dialogRef: MatDialogRef<ApprovalDeclineModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
  }

  createFormGroup = (): FormGroup => {
    return new FormGroup({
      comment: new FormControl('', ),
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
      this.dialogRef.close(button)
    })
  }
}
