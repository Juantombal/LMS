import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  protected apiAddress = 'http://localhost:8080/';

  constructor(protected http: HttpClient) {}

  protected generateOptions(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers };
  }

}
