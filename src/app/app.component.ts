import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public auth: AuthService  ) {
    auth.handleAuthentication();    // Handle the authentication
    auth.scheduleRenewal();         // Handle the token refreshing

    if ( !auth.isAuthenticated() )
      auth.login();
    }
  }
