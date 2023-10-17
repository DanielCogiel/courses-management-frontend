import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true
    })
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        headers: request.headers.append('token', token)
      })
    }
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const newToken = (event.body as any)?.token;
            if (newToken)
              localStorage.setItem('token', newToken);
          }
        }
      ),
      catchError(error => {
        if (error instanceof HttpErrorResponse
          && error.status === 401
          && error.url?.slice(error.url?.lastIndexOf('/')) !== '/login'
        )
          console.log('LOGOUT');
        return throwError(error);
      }))
  }
}
