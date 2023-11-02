import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";
import {Application} from "../../../model/application.model";
import {User} from "../../../model/user.model";
import {UserService} from "../../../services/user.service";
import {ApprovalDeclineModalComponent} from "../approval-decline-modal/approval-decline-modal.component";

@Component({
  selector: 'app-application-details-modal',
  templateUrl: './application-details-modal.component.html',
  styleUrls: ['./application-details-modal.component.css']
})
export class ApplicationDetailsModalComponent implements OnInit {
  application: Application;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApplicationDetailsModalComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.application = this.data.application
  }

  approvalDeclineModal = (application: Application, action: string) => {
    const dialogRefapprovalDeclineModal = this.dialog.open(ApprovalDeclineModalComponent, {
      data: {
        application: application,
        action: action,
        user: this.data.user
      }
      , autoFocus: false
    });
    dialogRefapprovalDeclineModal.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close()
      }
    });
  }

}
