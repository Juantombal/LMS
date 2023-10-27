import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../model/user.model";


@Injectable()
export class UserService extends ApiService {
  getUser(): Observable<User> {
    return this.http.get<User>(this.apiAddress + 'user/' + 6, this.generateOptions());
  }
}
