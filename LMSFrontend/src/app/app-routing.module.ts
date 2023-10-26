import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseOverviewComponent} from "./components/course/course-overview/course-overview.component";
import {CourseManagementComponent} from "./components/course/course-management/course-management.component";
import {PdpOverviewComponent} from "./components/pdp/pdp-overview/pdp-overview.component";

const routes: Routes = [
  { path: '', component: CourseOverviewComponent },
  { path: 'coursemanagement', component: CourseManagementComponent },
  { path: 'pdp', component: PdpOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
