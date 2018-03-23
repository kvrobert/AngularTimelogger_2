import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { TimeloggerService } from '../timelogger.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.auth.checkAuthentication();
   
    const acces_token = this.auth.getAccesToken();

    if ( acces_token ) {
      const clonedReq = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + acces_token)
      });
      return next.handle( clonedReq );
    }
    else {
      return next.handle( request); //duplikált kérés megy.. mondjuk ugyan az a kettő, majdnem..neemtom mé..
    }

  }
}
