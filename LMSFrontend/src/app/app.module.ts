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
import { EditPdpModalComponent } from './components/pdp/edit-pdp-modal/edit-pdp-modal.component';
import {PdpService} from "./services/pdp.service";
import { CourseApplicationModalComponent } from './components/application/course-application-modal/course-application-modal.component';
import {ApplicationService} from "./services/application.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import { ApplicationOverviewComponent } from './components/application/application-overview/application-overview.component';
import { ApplicationDetailsModalComponent } from './components/application/application-details-modal/application-details-modal.component';
import { ActionListDetailsModalComponent } from './components/pdp/action-list-details-modal/action-list-details-modal.component';
import { ApprovalDeclineModalComponent } from './components/application/approval-decline-modal/approval-decline-modal.component';
import { CompleteCourseModalComponent } from './components/course/complete-course-modal/complete-course-modal.component';
import { RolesOverviewComponent } from './components/role/roles-overview/roles-overview.component';
import { AddRoleModalComponent } from './components/role/add-role-modal/add-role-modal.component';
import {RoleService} from "./services/role.service";
import { DeleteRoleModalComponent } from './components/role/delete-role-modal/delete-role-modal.component';
import { CourseRoleLinkComponent } from './components/course/course-role-link/course-role-link.component';
import {CourseroleService} from "./services/courserole.service";
import { ReportOverviewComponent } from './components/report/report-overview/report-overview.component';
import { ReportCourseDetailComponent } from './components/report/report-course-detail/report-course-detail.component';
import { EvaluationModalComponent } from './components/course/evaluation-modal/evaluation-modal.component';
import { CourseEvaluationOverviewComponent } from './components/course/course-evaluation-overview/course-evaluation-overview.component';
import { CourseEvaluationDetailsComponent } from './components/course/course-evaluation-details/course-evaluation-details.component';

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
    DeleteCourseModalComponent,
    EditPdpModalComponent,
    CourseApplicationModalComponent,
    ApplicationOverviewComponent,
    ApplicationDetailsModalComponent,
    ActionListDetailsModalComponent,
    ApprovalDeclineModalComponent,
    CompleteCourseModalComponent,
    RolesOverviewComponent,
    AddRoleModalComponent,
    DeleteRoleModalComponent,
    CourseRoleLinkComponent,
    ReportOverviewComponent,
    ReportCourseDetailComponent,
    EvaluationModalComponent,
    CourseEvaluationOverviewComponent,
    CourseEvaluationDetailsComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
    ],
  providers: [
    CourseService,
    ApiService,
    UserService,
    PdpService,
    ApplicationService,
    RoleService,
    CourseroleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
