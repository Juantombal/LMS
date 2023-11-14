import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user.model";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {EditPdpModalComponent} from "../edit-pdp-modal/edit-pdp-modal.component";
import {ApplicationService} from "../../../services/application.service";
import {Application} from "../../../model/application.model";
import {ActionListDetailsModalComponent} from "../action-list-details-modal/action-list-details-modal.component";
import {Courserole} from "../../../model/courserole.model";
import {CourseService} from "../../../services/course.service";

@Component({
  selector: 'app-pdp-overview',
  templateUrl: './pdp-overview.component.html',
  styleUrls: ['./pdp-overview.component.css']
})
export class PdpOverviewComponent implements OnInit {
  applications: Application[] = [];
  loggedInUser: User;
  selectedOption: string = 'all';
  showBackground: boolean = false;
  showPresent: boolean = false;
  showFuture: boolean = false;
  showFutureRoles: boolean = false;
  constructor(
    private userService: UserService,
    private applicationService: ApplicationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPdp()
  }

  getPdp = () => {
    this.userService.getUser().subscribe((user) => {
      this.loggedInUser = user;
      this.getApplicationByUser()
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

  getApplicationByUser = () => {
    this.applicationService.getApplicationByUser(this.loggedInUser.id).subscribe((applications) => {
      this.applications = applications
    })
  }

  applicationUserDetails = (application: Application) => {
    const dialogPdpOverview = this.dialog.open(ActionListDetailsModalComponent, {data: application, autoFocus: false});

    dialogPdpOverview.afterClosed().subscribe(result => {
      this.getPdp()
    });
  }

  filterApplications(): Application[] {
    switch (this.selectedOption) {
      case 'actual':
        return this.applications.filter(application => application.applicationLines[application.applicationLines.length - 1].status !== 'COMPLETED'
          && application.applicationLines[application.applicationLines.length - 1].status != 'DECLINED');
      case 'finished':
        return this.applications.filter(application => application.applicationLines[application.applicationLines.length - 1].status === 'COMPLETED');
      case 'declined':
        return this.applications.filter(application => application.applicationLines[application.applicationLines.length - 1].status === 'DECLINED');
      default:
        return this.applications;
    }
  }
  toggleVisibility(section: string): void {
    switch (section) {
      case 'background':
        this.showBackground = !this.showBackground;
        break;
      case 'present':
        this.showPresent = !this.showPresent;
        break;
      case 'future':
        this.showFuture = !this.showFuture;
        break;
      case 'futureRoles':
        this.showFutureRoles = !this.showFutureRoles;
        break;
    }
  }
}
