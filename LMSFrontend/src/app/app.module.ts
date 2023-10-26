import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CourseOverviewComponent } from './components/course/course-overview/course-overview.component';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {NavigationComponent} from "./components/navigation/navigation.component";
import { FooterComponent } from './components/footer/footer.component';
import {CourseService} from "./services/course.service";
import {ApiService} from "./services/api.service";
import {HttpClientModule} from "@angular/common/http";
import { CourseDetailsModalComponent } from './components/course/course-details-modal/course-details-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import { CourseManagementComponent } from './components/course/course-management/course-management.component';
import { PdpOverviewComponent } from './components/pdp/pdp-overview/pdp-overview.component';
import { AddCourseModalComponent } from './components/course/add-course-modal/add-course-modal.component';
import { EditCourseModalComponent } from './components/course/edit-course-modal/edit-course-modal.component';
import { DeleteCourseModalComponent } from './components/course/delete-course-modal/delete-course-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseOverviewComponent,
    NavigationComponent,
    FooterComponent,
    CourseDetailsModalComponent,
    CourseManagementComponent,
    PdpOverviewComponent,
    AddCourseModalComponent,
    EditCourseModalComponent,
    DeleteCourseModalComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
    ],
  providers: [
    CourseService,
    ApiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
