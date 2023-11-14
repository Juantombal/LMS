import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course} from "../model/course.model";
import {EmployeeCourse} from "../model/employeecourse.model";

@Injectable()
export class CourseService extends ApiService {
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiAddress + 'course', this.generateOptions());
  }

  postCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiAddress + `course`, course , this.generateOptions());
  }

  postEmployeeCourse(employeeCourse: Partial<EmployeeCourse>): Observable<EmployeeCourse> {
    return this.http.post<EmployeeCourse>(this.apiAddress + `employeecourse`, employeeCourse , this.generateOptions());
  }

  getEmployeeCourseByUser(userId: number): Observable<EmployeeCourse[]> {
    return this.http.get<EmployeeCourse[]>(this.apiAddress + 'employeecourse/user/' + userId, this.generateOptions());
  }

  updateCourse(courseId: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(this.apiAddress + `course/` + courseId, course , this.generateOptions());
  }

  setCourseInactive(courseId: number): Observable<Course> {
    return this.http.put<Course>(this.apiAddress + `course/inactive/` + courseId, false , this.generateOptions());
  }

  // deleteCourse(courseId: number): Observable<Course> {
  //   return this.http.delete<Course>(this.apiAddress + `course/` + courseId , this.generateOptions());
  // }
}
