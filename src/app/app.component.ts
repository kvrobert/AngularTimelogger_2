import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import { timeout } from 'rxjs/operator/timeout';
import { TimeloggerService } from './timelogger.service';
import {LoaderService} from "./Services/loader.service";
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  

  constructor( private auth: AuthService, private message: MessageService, public loader: LoaderService  ) {
    auth.handleAuthentication();    // Handle the authentication
    auth.scheduleRenewal();         // Handle the token refreshing
    
    setTimeout( () => {
      if ( !auth.isAuthenticated() ) { auth.login() }
    },2000 );
  }
}
