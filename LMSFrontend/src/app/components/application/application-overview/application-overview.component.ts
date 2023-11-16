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
    this.getUser()
  }

  getApplications = () => {
    this.applicationService.getApplications().subscribe((applications) => {
      this.applications = applications;
      this.filterApplicationsByRole();
    });
  }

  filterApplicationsByRole = () => {
    if (this.loggedInUser) {
      if (this.loggedInUser.role === 'FIELDMANAGER') {
        this.applications = this.applications.filter(application =>
          application.applicationLines[application.applicationLines.length - 1].status === 'FIELDMANAGER'
        );
      } else if (this.loggedInUser.role === 'DIRECTOR') {
        this.applications = this.applications.filter(application =>
          application.applicationLines[application.applicationLines.length - 1].status === 'DIRECTOR'
        );
      } else if (this.loggedInUser.role === 'SECRETERIAT') {
        this.applications = this.applications.filter(application =>
          application.applicationLines[application.applicationLines.length - 1].status === 'SECRETERIAT'
        );
      }
      else {
        this.applications = [];
      }
    }
  }

  applicationDetails = (application: Application) => {
    const dialogRefApplicationDetails = this.dialog.open(ApplicationDetailsModalComponent, {data: {application: application, user:this.loggedInUser}, autoFocus: false, maxHeight: '90vh'});

    dialogRefApplicationDetails.afterClosed().subscribe(result => {
        this.getApplications();
    });
  }

  getUser = () => {
    this.userService.getUser().subscribe((user) => {
      this.loggedInUser = user;
      this.getApplications()
    })
  }
}
