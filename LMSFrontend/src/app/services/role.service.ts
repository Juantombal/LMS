import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Role} from "../model/role.model";

@Injectable()
export class RoleService extends ApiService {
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiAddress + 'role', this.generateOptions());
  }

  postRole(role: Partial<Role>): Observable<Role> {
    return this.http.post<Role>(this.apiAddress + `role`, role , this.generateOptions());
  }

  deleteRole(roleId: number): Observable<Role> {
    return this.http.delete<Role>(this.apiAddress + `role/` + roleId , this.generateOptions());
  }
}
