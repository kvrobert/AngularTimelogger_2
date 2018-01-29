import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  message: string[];
  log: string[];
  error: string[];

  constructor() { }

  addMessage( message: string ): void {
    this.message.push( message );
  };

  addLogMessage( logMessage: string ): void {
    this.log.push( logMessage );
  };



// To Do.....add message fetter, cleaner...
}
