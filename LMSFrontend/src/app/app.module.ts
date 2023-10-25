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
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CourseOverviewComponent,
    NavigationComponent,
    FooterComponent,
    CourseDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [
    CourseService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
