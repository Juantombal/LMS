// authentication.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = false;

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
    // Logica voor inloggen
  }

  logout() {
    this.loggedIn = false;
    // Logica voor uitloggen
  }
}
