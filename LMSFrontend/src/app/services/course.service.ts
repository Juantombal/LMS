import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course} from "../model/course.model";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class CourseService extends ApiService {
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiAddress + 'course', this.generateOptions());
  }

  postCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiAddress + `course`, course , this.generateOptions());
  }

  updateCourse(courseId: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(this.apiAddress + `course/` + courseId, course , this.generateOptions());
  }

  updateCourses(item: string, course: Partial<Course>): Observable<Course> {
    const params = new HttpParams().set('item', item);
    const options = { params: params };

    return this.http.put<Course>(this.apiAddress + 'course/courses', course, options);
  }

  deleteCourse(courseId: number): Observable<Course> {
    return this.http.delete<Course>(this.apiAddress + `course/` + courseId , this.generateOptions());
  }

  deleteCourses(itemToDelete: string): Observable<Course> {
    const params = new HttpParams().set('item', itemToDelete);
    const options = { params: params };

    return this.http.delete<Course>(this.apiAddress + `course/courses`, options);
  }
}
