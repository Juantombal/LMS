import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CourseDetailsModalComponent} from "../course-details-modal/course-details-modal.component";
import {User} from "../../../model/user.model";
import {UserService} from "../../../services/user.service";
import {switchMap} from "rxjs";
import {CourseroleService} from "../../../services/courserole.service";
import {Courserole} from "../../../model/courserole.model";

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {
  loggedInUser: User;
  courseRoles: Courserole[] = [];
  filteredRoles: string[] = [];
  selectedRole: string;
  filteredCourses: Courserole[] = [];
  sortColumn: string = '';
  isReverseSort: boolean = false;
  searchText: string = '';

  constructor(
    private courseRoleService: CourseroleService,
    public dialog: MatDialog,
    private userService: UserService
  ) {  }

  ngOnInit(): void {
    this.userService.getUser()
      .pipe(
        switchMap((user) => {
          this.loggedInUser = user;
          return this.courseRoleService.getCourseRoles();
        })
      )
      .subscribe((courseRoles) => {
        this.courseRoles = courseRoles;
        this.filterRoles();
        this.selectedRole = this.loggedInUser.jobRole;
        this.filterCourses();
      });
  }

  getCourses(): void {
    this.courseRoleService.getCourseRoles()
      .subscribe({
        next: courseRoles => {
          this.courseRoles = courseRoles;
          this.filterCourses()
          this.filterRoles();
        },
      });
  }

  filterRoles(): void {
    if (this.courseRoles) {
      const uniqueRoles = Array.from(new Set(this.courseRoles.map(courseRole => courseRole.role.name)));
      this.filteredRoles = ['Alle rollen', ...uniqueRoles];
    }
  }

  filterCourses(): void {
    if (!this.searchText || this.searchText.trim() === '') {
      if (this.selectedRole === 'Alle rollen') {
        this.filteredCourses = this.courseRoles;
      } else {
        this.filteredCourses = this.courseRoles.filter(courseRole =>
          courseRole.role.name === this.selectedRole
        );
      }
    } else {
      const searchTerm = this.searchText.toLowerCase().trim();

      if (this.selectedRole === 'Alle rollen') {
        this.filteredCourses = this.courseRoles.filter(courseRole =>
          courseRole.course.item.toLowerCase().includes(searchTerm)
        );
      } else {
        this.filteredCourses = this.courseRoles.filter(courseRole =>
          courseRole.role.name === this.selectedRole &&
          courseRole.course.item.toLowerCase().includes(searchTerm)
        );
      }
    }

    this.formatCostAmounts();
    this.sortCourses();
  }

  formatCostAmounts(): void {
    if (this.filteredCourses) {
      this.filteredCourses.forEach(courseRole => {
        if (courseRole.course && courseRole.course.costAmount !== undefined) {
          const costAmount = parseFloat(String(courseRole.course.costAmount));
          if (!isNaN(costAmount)) {
            const roundedCost = costAmount.toFixed(2).replace('.', ',');
            courseRole.course.costAmount = roundedCost;
          }
        }
      });
    }
  }

  sortCourses(): void {
    if (this.selectedRole !== 'Alle rollen') {
      const sortOrder: { [key: string]: number } = {
        'Prio1': 1,
        'Prio2': 2,
        'Prio3': 3,
        'N/A': 4,
      };

      this.filteredCourses.sort((a, b) => {
        const prioA = sortOrder[a.prio] || 5;
        const prioB = sortOrder[b.prio] || 5;
        return prioA - prioB;
      });
    }

    if (this.selectedRole === 'Alle rollen' && this.filteredCourses) {
      this.filteredCourses = this.filteredCourses.sort((a, b) => {
        return a.role.name.localeCompare(b.role.name);
      });
    }
  }

  sortByColumn(columnName: string) {
    if (this.sortColumn === columnName) {
      this.isReverseSort = !this.isReverseSort;
    } else {
      this.sortColumn = columnName;
      this.isReverseSort = false;
    }

    this.filteredCourses.sort((a, b) => {
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

  courseDetails = (courseRoles: Courserole) => {
    const dialogRefDatabaseDetails = this.dialog.open(CourseDetailsModalComponent, {data: {courseRoles: courseRoles, user: this.loggedInUser}, autoFocus: false, maxHeight: '90vh'});

    dialogRefDatabaseDetails.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getCourses();
      }
    });
  }
}
