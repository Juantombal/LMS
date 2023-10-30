import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user.model";
import {UserService} from "../../../services/user.service";
import {Course} from "../../../model/course.model";
import {CourseDetailsModalComponent} from "../../course/course-details-modal/course-details-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {EditPdpModalComponent} from "../edit-pdp-modal/edit-pdp-modal.component";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-pdp-overview',
  templateUrl: './pdp-overview.component.html',
  styleUrls: ['./pdp-overview.component.css']
})
export class PdpOverviewComponent implements OnInit {
  loggedInUser: User;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPdp()
  }

  getPdp = () => {
    this.userService.getUser().subscribe((user) => {
      this.loggedInUser = user;
    })
  }

  editPdp = (loggedInUser: User) => {
    const dialogRefPdp = this.dialog.open(EditPdpModalComponent, {data: loggedInUser, autoFocus: false});

    dialogRefPdp.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getPdp()
      }
    });
  }
}
