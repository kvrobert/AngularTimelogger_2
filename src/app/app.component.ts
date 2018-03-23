import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import { timeout } from 'rxjs/operator/timeout';
import { TimeloggerService } from './timelogger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor( public auth: AuthService, public timelogger: TimeloggerService  ) {
    auth.handleAuthentication();    // Handle the authentication
    auth.scheduleRenewal();         // Handle the token refreshing
    }

  

  }
  