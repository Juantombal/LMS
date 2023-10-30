import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course} from "../model/course.model";
import {Application} from "../model/application.model";

@Injectable()
export class ApplicationService extends ApiService {
  postApplication(application: Partial<Application>): Observable<Application> {
    return this.http.post<Application>(this.apiAddress + `application`, application , this.generateOptions());
  }
}
