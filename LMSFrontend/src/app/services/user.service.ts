import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable()
export class UserService extends ApiService {
  private userId: number;

  setUserId(id: number) {
    this.userId = id;
  }

  getUserId(): number {
    return this.userId;
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.apiAddress + 'user/' + this.getUserId(), this.generateOptions());
  }

  sendEmail(role: string, user: User): Observable<string> {
    return this.http.post<string>(this.apiAddress + `user/email?role=${role}`, user, this.generateOptions());
  }
}
