import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService) { }

  ngOnInit() {
  }
  callLogin() {
    this.auth.login();
  }

  status(){
    console.log( "Az authentikációm: " + this.auth.isAuthenticated() );
  }

}
