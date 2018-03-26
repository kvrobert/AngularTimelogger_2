import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class MessageService {

  infoMessage: string[];
  errorMessage: string[];

  constructor( public popUpBar: MatSnackBar ) { }

  addMessage( message: string ): void {
    this.infoMessage.push( message );
  }

  openPopUp(message: string, action?: string, snakcbarClass?: string[] ) {
    let config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = snakcbarClass;
    config.verticalPosition = "bottom";
    config.horizontalPosition = "center";
    this.popUpBar.open( message, action, config );
  }


// To Do.....add message fetter, cleaner...
}
