import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (!token)
      return next.handle(request);

    const requestWithToken = request.clone({
      headers: request.headers.append('token', token)
    })

    return next.handle(requestWithToken);
  }
}
