import { Component, OnInit } from '@angular/core';
import {Application} from "../../../model/application.model";
import {ApplicationService} from "../../../services/application.service";
import {MatDialog} from "@angular/material/dialog";
import {ApplicationDetailsModalComponent} from "../application-details-modal/application-details-modal.component";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user.model";

@Component({
  selector: 'app-application-overview',
  templateUrl: './application-overview.component.html',
  styleUrls: ['./application-overview.component.css']
})
export class ApplicationOverviewComponent implements OnInit {
  applications: Application[] = [];
  loggedInUser: User;

  constructor(
    private applicationService: ApplicationService,
    public dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getApplications()
    this.getUser()
  }

  getApplications = () => {
    this.applicationService.getApplications().subscribe((applications) => {
      this.applications = applications
    })
  }

  applicationDetails = (application: Application) => {
    const dialogRefApplicationDetails = this.dialog.open(ApplicationDetailsModalComponent, {data: application, autoFocus: false});

    dialogRefApplicationDetails.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getApplications();
      }
    });
  }

  getUser = () => {
    this.userService.getUser().subscribe((user) => {
      this.loggedInUser = user;
    })
  }
}
