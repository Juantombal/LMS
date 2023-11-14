import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course} from "../model/course.model";
import {Pdp} from "../model/pdp.model";
import {FutureRole} from "../model/futurerole.model";

@Injectable()
export class PdpService extends ApiService {
  updatePdp(pdpId: number, pdp: Partial<Pdp>): Observable<Course> {
    return this.http.put<Course>(this.apiAddress + `pdp/` + pdpId, pdp , this.generateOptions());
  }

  getFutureRolesByPdpId(pdpId: number): Observable<FutureRole[]> {
    return this.http.get<FutureRole[]>(this.apiAddress + 'futurerole/' + pdpId, this.generateOptions());
  }

  postFutureRole(pdpId: number, futureRole: Partial<FutureRole>): Observable<FutureRole> {
    return this.http.post<FutureRole>(this.apiAddress + `futurerole/` + pdpId, futureRole , this.generateOptions());
  }

  deleteFutureRole(futureRoleId: number): Observable<FutureRole> {
    return this.http.delete<FutureRole>(this.apiAddress + `futurerole/` + futureRoleId , this.generateOptions());
  }
}
