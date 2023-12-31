import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Application} from "../model/application.model";
import {ApplicationLine} from "../model/applicationline.model";

@Injectable()
export class ApplicationService extends ApiService {
  postApplication(application: Partial<Application>): Observable<Application> {
    return this.http.post<Application>(this.apiAddress + `application`, application , this.generateOptions());
  }

  postApplicationLine(applicationId: number, applicationLine: Partial<ApplicationLine>): Observable<ApplicationLine> {
    return this.http.post<ApplicationLine>(this.apiAddress + `applicationline/` + applicationId, applicationLine , this.generateOptions());
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiAddress + 'application', this.generateOptions());
  }

  getApplicationByUser(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiAddress + 'application/user/' + userId, this.generateOptions());
  }
}
