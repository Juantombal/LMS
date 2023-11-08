import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Courserole} from "../model/courserole.model";

@Injectable()
export class CourseroleService extends ApiService {
  getCourseRoles(): Observable<Courserole[]> {
    return this.http.get<Courserole[]>(this.apiAddress + 'courserole', this.generateOptions());
  }

  getCourseRoleByCourse(courseId: number): Observable<Courserole[]> {
    return this.http.get<Courserole[]>(this.apiAddress + 'courserole/course/' + courseId, this.generateOptions());
  }

  postCourseRole(courseRole: Partial<Courserole>): Observable<Courserole> {
    return this.http.post<Courserole>(this.apiAddress + `courserole`, courseRole , this.generateOptions());
  }

  deleteCourseRole(courseRoleId: number): Observable<Courserole> {
    return this.http.delete<Courserole>(this.apiAddress + `courserole/` + courseRoleId , this.generateOptions());
  }
}
