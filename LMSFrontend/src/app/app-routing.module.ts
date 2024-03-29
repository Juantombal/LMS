import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseOverviewComponent} from "./components/course/course-overview/course-overview.component";
import {CourseManagementComponent} from "./components/course/course-management/course-management.component";
import {PdpOverviewComponent} from "./components/pdp/pdp-overview/pdp-overview.component";
import {
  ApplicationOverviewComponent
} from "./components/application/application-overview/application-overview.component";
import {RolesOverviewComponent} from "./components/role/roles-overview/roles-overview.component";
import {CourseRoleLinkComponent} from "./components/course/course-role-link/course-role-link.component";
import {ReportOverviewComponent} from "./components/report/report-overview/report-overview.component";
import {
  CourseEvaluationOverviewComponent
} from "./components/course/course-evaluation-overview/course-evaluation-overview.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: 'course', component: CourseOverviewComponent },
  { path: 'coursemanagement', component: CourseManagementComponent },
  { path: '', component: PdpOverviewComponent },
  { path: 'application', component: ApplicationOverviewComponent },
  { path: 'roles', component: RolesOverviewComponent },
  { path: 'courselink', component: CourseRoleLinkComponent },
  { path: 'report', component: ReportOverviewComponent },
  { path: 'evaluation', component: CourseEvaluationOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
