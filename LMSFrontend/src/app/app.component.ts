import { Component } from '@angular/core';
import {AuthenticationService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LMSFrontend';
  constructor(public authService: AuthenticationService) {}
}
