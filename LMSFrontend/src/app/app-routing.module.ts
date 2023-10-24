import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseOverviewComponent} from "./components/course-overview/course-overview.component";

const routes: Routes = [
  { path: '', component: CourseOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
