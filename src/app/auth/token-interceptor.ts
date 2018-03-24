import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import {LoaderService} from "../Services/loader.service";

// A kikommentelt részek--> auth service nélküli megoldás
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService ) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const acces_token = this.auth.getAccesToken();

     if ( localStorage.getItem('access_token')/*acces_token*/ ) {
     const clonedReq = request.clone({
     headers: request.headers
       .set('Content-Type', 'application/json')
       //.set("Authorization", "Bearer " + acces_token)
       .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
     });
     return next.handle( clonedReq );
     }
     else {
     return next.handle( request); //duplikált kérés megy.. mondjuk ugyan az a kettő, majdnem..neemtom mé..
     }

     }
}
