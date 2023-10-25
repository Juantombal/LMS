import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course} from "../model/course.model";

@Injectable()
export class CourseService extends ApiService {
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiAddress + 'course', this.generateOptions());
  }
}
