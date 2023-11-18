import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable()
export class UserService extends ApiService {
  getUser(): Observable<User> {
    return this.http.get<User>(this.apiAddress + 'user/' + 2, this.generateOptions());
  }

  sendEmail(role: string, user: User): Observable<string> {
    return this.http.post<string>(this.apiAddress + `user/email?role=${role}`, user, this.generateOptions());
  }
}
