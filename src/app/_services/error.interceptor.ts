import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { pipe } from '@angular/core/src/render3';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ErrorIntrceptor implements HttpInterceptor  {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
                .pipe( 
                    catchError( error => {
                        if (error instanceof HttpErrorResponse) {
                            const applicationError = error.headers.get('Application-Error');
                            if (applicationError) {
                                console.error(applicationError);
                                return throwError(applicationError);
                            }
                            const serverError = error.error;
                            let modalStateErrors = '';
                            if (serverError && typeof serverError === 'object') {
                                for (const key in serverError) {
                                    modalStateErrors += serverError[key] + '\n';
                                }
                            }
                            return throwError(modalStateErrors || serverError || 'Server Error');
                        }
                    }
                ) 
        );
    }

}

export const ErrorInterceptorProvide = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntrceptor,
    multi: true
};