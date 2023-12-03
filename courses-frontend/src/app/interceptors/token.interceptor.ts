import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Dodaj token do żądania, jeśli jest w localStorage
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        headers: request.headers.append('token', token)
      })
    }

    return next.handle(request)
      .pipe(
        catchError(error => {
          //jeśli error z API z kodem 401, wyloguj
        if (error instanceof HttpErrorResponse
          && error.status === 401
          && error.url?.slice(error.url?.lastIndexOf('/')) !== '/login'
        )
          this._auth.logout();
        return throwError(error);
      })
    )
  }
}
