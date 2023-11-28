import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user.model";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {EditPdpModalComponent} from "../edit-pdp-modal/edit-pdp-modal.component";
import {ApplicationService} from "../../../services/application.service";
import {Application} from "../../../model/application.model";
import {ActionListDetailsModalComponent} from "../action-list-details-modal/action-list-details-modal.component";
import {TDocumentDefinitions} from "pdfmake/interfaces";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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
    const dialogRefPdp = this.dialog.open(EditPdpModalComponent, {data: loggedInUser, autoFocus: false, maxHeight: '90vh'});

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
    const dialogPdpOverview = this.dialog.open(ActionListDetailsModalComponent, {data: application, autoFocus: false, maxHeight: '90vh'});

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
    this.showBackground = section === 'background' && !this.showBackground;
    this.showPresent = section === 'present' && !this.showPresent;
    this.showFuture = section === 'future' && !this.showFuture;
    this.showFutureRoles = section === 'futureRoles' && !this.showFutureRoles;

    if (section !== 'background') {
      this.showBackground = false;
    }
    if (section !== 'present') {
      this.showPresent = false;
    }
    if (section !== 'future') {
      this.showFuture = false;
    }
    if (section !== 'futureRoles') {
      this.showFutureRoles = false;
    }
  }

  public constructPDF() {
    const tableBody = [
      [{ text: 'Item', style: 'headerH4' }, { text: 'Website', style: 'headerH4' }, { text: 'Status', style: 'headerH4' }, { text: 'Datum indiening', style: 'headerH4' }],
      ...this.filterApplications().map(application => [
        { text: application.course.item, fontSize: 11 },
        { text: application.course.website, link: application.course.website, alignment: 'left', fontSize: 11 },
        { text: this.getStatusText(application.applicationLines[application.applicationLines.length - 1].status), fontSize: 11 },
        { text: application.submissionDate, fontSize: 11 }
      ])
    ];

    const documentDefinition: TDocumentDefinitions = {
      content: [
        {text: 'Mijn pdp - ' + this.loggedInUser.name, style: 'header',},
        {text: 'Achtergrond:', style: 'headerH4'},
        {text: this.loggedInUser.pdp.background, style: 'text'},

        {text: 'Heden: \n' , style: 'headerH4'},
        {text: this.loggedInUser.pdp.present, style: 'text'},

        {text: 'Toekomst:' , style: 'headerH4'},
        {text: this.loggedInUser.pdp.future, style: 'text'},

        {text: 'Toekomstige rollen:', style: 'headerH4' },
        {
          text: this.loggedInUser.pdp.futureRole.map(futureRole => futureRole.name + ' ' + futureRole.achievementDate).join('\n'),
          style: 'text'
        },
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 515, y2: 10, lineWidth: 1, lineColor: '#000' }] },
        { text: 'Acties', style: 'headerH5' },
        {
          table: {
            headerRows: 1,
            body: tableBody,
            widths: ['25%', '35%', '25%', '15%']
          }
        }

      ],
      styles: {
        header: {
          fontSize: 20,
          marginBottom:20,
        },
        headerH4: {
          fontSize: 11,
          bold: true
        },
        headerH5: {
          fontSize: 14,
          bold: true,
          marginTop: 20,
          marginBottom:10
        },
        text: {
          fontSize:11,
          marginBottom: 10
        },
        label: {
          fontSize:11,
        }
      },
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'FIELDMANAGER':
        return 'Ter beoordeling bij FM';
      case 'DIRECTOR':
        return 'Ter beoordeling bij Directeur';
      case 'SECRETERIAT':
        return 'In afwachting van Secretariaat';
      case 'APPROVED':
        return 'Aanvraag goedgekeurd!';
      case 'DECLINED':
        return 'Aanvraag afgekeurd!';
      case 'COMPLETED':
        return 'Cursus voltooid';
      default:
        return '';
    }
  }
}
