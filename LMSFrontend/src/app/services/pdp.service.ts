import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Course} from "../model/course.model";
import {Pdp} from "../model/pdp.model";



@Injectable()
export class PdpService extends ApiService {
  updatePdp(pdpId: number, pdp: Partial<Pdp>): Observable<Course> {
    return this.http.put<Course>(this.apiAddress + `pdp/` + pdpId, pdp , this.generateOptions());
  }
}
