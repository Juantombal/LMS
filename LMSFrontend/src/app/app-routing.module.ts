import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseOverviewComponent} from "./components/course/course-overview/course-overview.component";
import {CourseManagementComponent} from "./components/course/course-management/course-management.component";
import {PdpOverviewComponent} from "./components/pdp/pdp-overview/pdp-overview.component";
import {
  ApplicationOverviewComponent
} from "./components/application/application-overview/application-overview.component";

const routes: Routes = [
  { path: 'course', component: CourseOverviewComponent },
  { path: 'coursemanagement', component: CourseManagementComponent },
  { path: '', component: PdpOverviewComponent },
  { path: 'application', component: ApplicationOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
