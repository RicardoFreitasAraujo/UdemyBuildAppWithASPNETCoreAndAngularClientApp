import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    
    let token = this.authService.GetToken();

    if (token) {
      return next.handle(req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + token)
      }));   
    }

    return next.handle(req); 

  }

}


export const JwtInterceptorProvider = { 
  provide: HTTP_INTERCEPTORS, 
  useClass: JwtInterceptor, 
  multi: true 
}


