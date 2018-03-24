import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class MessageService {

  infoMessage: string[];
  errorMessage: string[];

  constructor( public popUpBar: MatSnackBar ) { }

  addMessage( message: string ): void {
    this.infoMessage.push( message );
  }

  openPopUp(message: string, action: string) {
    this.popUpBar.open(message, action, {
      duration: 2000,
    });
  }


// To Do.....add message fetter, cleaner...
}
