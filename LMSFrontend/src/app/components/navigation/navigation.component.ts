import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user.model";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedInUser: User;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser = () => {
    this.userService.getUser().subscribe((user) => {
      this.loggedInUser = user;
    })
  }

  logout() {
    this.authService.logout();
  }
}
