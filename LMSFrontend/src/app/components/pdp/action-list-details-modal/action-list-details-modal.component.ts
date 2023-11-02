import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {User} from "../../../model/user.model";
import {Application} from "../../../model/application.model";

@Component({
  selector: 'app-action-list-details-modal',
  templateUrl: './action-list-details-modal.component.html',
  styleUrls: ['./action-list-details-modal.component.css']
})
export class ActionListDetailsModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Application,
  ) { }

  ngOnInit(): void {
  }

}
