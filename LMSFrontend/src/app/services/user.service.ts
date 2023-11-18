import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class UserService extends ApiService {
  getUser(): Observable<User> {
    return this.http.get<User>(this.apiAddress + 'user/' + 4, this.generateOptions());
  }

  sendEmail(role: string) {
    console.log(this.apiAddress + `user/email?role=${role}`)
    return this.http.post(this.apiAddress + `user/email?role=${role}`, this.generateOptions());
  }
}
