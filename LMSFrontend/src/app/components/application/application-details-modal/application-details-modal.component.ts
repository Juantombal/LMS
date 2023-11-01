import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../model/course.model";
import {Application} from "../../../model/application.model";

@Component({
  selector: 'app-application-details-modal',
  templateUrl: './application-details-modal.component.html',
  styleUrls: ['./application-details-modal.component.css']
})
export class ApplicationDetailsModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public application: Application,
    private dialogRef: MatDialogRef<ApplicationDetailsModalComponent>,
  ) { }

  ngOnInit(): void {
  }


}
