import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userId: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService
  ) {}


  ngOnInit(): void {
  }

  login() {
    this.userService.setUserId(this.userId);
    this.authService.login();
    this.router.navigate(['']);
  }

}
