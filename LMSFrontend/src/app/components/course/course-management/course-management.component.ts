import { Component, OnInit } from '@angular/core';
import {Course} from "../../../model/course.model";
import {CourseService} from "../../../services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCourseModalComponent} from "../add-course-modal/add-course-modal.component";
import {EditCourseModalComponent} from "../edit-course-modal/edit-course-modal.component";
import {DeleteCourseModalComponent} from "../delete-course-modal/delete-course-modal.component";
import {CourseRoleLinkComponent} from "../course-role-link/course-role-link.component";

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses: Course[] = [];
  sortColumn: string = '';
  isReverseSort: boolean = false;
  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
  ) {  }

  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe({
        next: courses => {
          this.courses = courses;
        },
      });
  }

  addCourse = () => {
    const dialogRefAddCourse = this.dialog.open(AddCourseModalComponent, {autoFocus: false, maxHeight: '90vh'});

    dialogRefAddCourse.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }

  editCourse = (course: Course) => {
    const dialogRefEditCourse = this.dialog.open(EditCourseModalComponent, {data: course, autoFocus: false,  maxHeight: '90vh'});

    dialogRefEditCourse.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }

  DeleteCourse = (course: Course) => {
    const dialogRefDeleteCourse = this.dialog.open(DeleteCourseModalComponent, {data: course, autoFocus: false,  maxHeight: '90vh'});

    dialogRefDeleteCourse.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }

  courseLink = (course: Course) => {
    const dialogRefCourseRoleLink = this.dialog.open(CourseRoleLinkComponent, {data: course, autoFocus: false, maxHeight: '90vh'});

    dialogRefCourseRoleLink.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }

  sortByColumn(columnName: string) {
    if (this.sortColumn === columnName) {
      this.isReverseSort = !this.isReverseSort;
    } else {
      this.sortColumn = columnName;
      this.isReverseSort = false;
    }

    this.courses.sort((a, b) => {
      const aValue = this.getPropertyValue(a, columnName);
      const bValue = this.getPropertyValue(b, columnName);

      if (aValue < bValue) {
        return this.isReverseSort ? 1 : -1;
      }
      if (aValue > bValue) {
        return this.isReverseSort ? -1 : 1;
      }
      return 0;
    });
  }

  getPropertyValue(obj: any, propName: string): any {
    const props = propName.split('.');
    let value = obj;
    for (const prop of props) {
      value = value[prop];
    }
    return value;
  }
}
