import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import { timeout } from 'rxjs/operator/timeout';
import { TimeloggerService } from './timelogger.service';
import {LoaderService} from "./Services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor( public auth: AuthService, public loader: LoaderService  ) {
    auth.handleAuthentication();    // Handle the authentication
    auth.scheduleRenewal();         // Handle the token refreshing
    }



  }
