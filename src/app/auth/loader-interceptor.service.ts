import { Injectable } from '@angular/core';
import {LoaderService} from "../Services/loader.service";
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor  {

  constructor(loader: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("START LOAGER SPINNER");

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log("Stop LOAGER SPINNER, firt IF");
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          console.log("Stop LOAGER SPINNER, ERROR IF");
        }
      }
    });
  }

}
