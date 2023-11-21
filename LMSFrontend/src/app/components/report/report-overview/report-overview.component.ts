import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../../../services/application.service";
import {Course} from "../../../model/course.model";
import {CourseService} from "../../../services/course.service";
import {DeleteCourseModalComponent} from "../../course/delete-course-modal/delete-course-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ReportCourseDetailComponent} from "../report-course-detail/report-course-detail.component";

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.css']
})
export class ReportOverviewComponent implements OnInit {
  showCompleted: boolean = true;
  showInProgress: boolean = true;
  showApplications: boolean = true;
  showCurrentApplications: boolean = true;
  showAll: boolean = false;
  applications: any[] = [];
  courses: Course[] = [];
  selectedSortOption: string = '';

  constructor(
    private applicationService: ApplicationService,
    private courseService: CourseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getApplications()
    this.getCourses()
  }

  getApplications = () => {
    this.applicationService.getApplications().subscribe((applications) => {
      this.applications = applications;
    });
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe({
        next: courses => {
          this.courses = courses;
        },
      });
  }

  // checkAll() {
  //   if (this.showApplications && this.showCurrentApplications && this.showInProgress && this.showCompleted) {
  //     // Als alle checkboxes zijn aangevinkt, schakel ze uit
  //     this.showApplications = false;
  //     this.showCurrentApplications = false;
  //     this.showInProgress = false;
  //     this.showCompleted = false;
  //   } else {
  //     // Als niet alle checkboxes zijn aangevinkt, schakel ze allemaal in
  //     this.showApplications = true;
  //     this.showCurrentApplications = true;
  //     this.showInProgress = true;
  //     this.showCompleted = true;
  //   }
  // }

  // checkIndividual() {
  //   if (!this.showApplications || !this.showCurrentApplications || !this.showInProgress || !this.showCompleted) {
  //     this.showAll = false;
  //   }
  // }

  getCompletedCount(courseId: number): number {
    return this.applications.filter(app => app.course.id === courseId && app.applicationLines[app.applicationLines.length - 1].status === 'COMPLETED').length;
  }

  getInProgressCount(courseId: number): number {
    return this.applications.filter(app => app.course.id === courseId && app.applicationLines[app.applicationLines.length - 1].status === 'APPROVED').length;
  }

  getApplicationCount(courseId: number): number {
    return this.applications.filter(app => app.course.id === courseId).length;
  }

  getCurrentApplicationCount(courseId: number): number {
    return this.applications.filter(app => app.course.id === courseId && app.applicationLines[app.applicationLines.length - 1].status !== 'APPROVED'
      && app.applicationLines[app.applicationLines.length - 1].status !== 'COMPLETED'
      && app.applicationLines[app.applicationLines.length - 1].status !== 'DECLINED').length;
  }

  sortApplications(): void {
    switch (this.selectedSortOption) {
      case 'applications':
        this.courses.sort((a, b) => this.getApplicationCount(b.id) - this.getApplicationCount(a.id));
        break;
      case 'currentApplications':
        this.courses.sort((a, b) => this.getCurrentApplicationCount(b.id) - this.getCurrentApplicationCount(a.id));
        break;
      case 'inProgress':
        this.courses.sort((a, b) => this.getInProgressCount(b.id) - this.getInProgressCount(a.id));
        break;
      case 'completed':
        this.courses.sort((a, b) => this.getCompletedCount(b.id) - this.getCompletedCount(a.id));
        break;
      default:
        break;
    }
  }

  ReportCourseDetails = (course: Course) => {
    this.dialog.open(ReportCourseDetailComponent, {data: course, autoFocus: false,  maxHeight: '90vh'});
  }
}
