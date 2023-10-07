import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_URL} from "./api.config";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  get<T>(url: string, headers?: HttpHeaders, isUrlExact: boolean = false): Observable<HttpResponse<T>> {
    return this.http.get(isUrlExact ? url : `${SERVER_URL}${url}`, {
      headers: headers,
      observe: 'response'
    }) as Observable<HttpResponse<T>>;
  }
  post<T>(url: string, body?: any, headers?: HttpHeaders, isUrlExact: boolean = false): Observable<HttpResponse<T>> {
    return this.http.post(isUrlExact ? url : `${SERVER_URL}${url}`, body, {
      headers: headers,
      observe: 'response'
    }) as Observable<HttpResponse<T>>;
  }
  put<T>(url: string, body?: any, headers?: HttpHeaders, isUrlExact: boolean = false): Observable<HttpResponse<T>> {
    return this.http.put(isUrlExact ? url : `${SERVER_URL}${url}`, body, {
      headers: headers,
      observe: 'response'
    }) as Observable<HttpResponse<T>>;
  }
  delete<T>(url: string, headers?: HttpHeaders, isUrlExact: boolean = false): Observable<HttpResponse<T>> {
    return this.http.delete(isUrlExact ? url : `${SERVER_URL}${url}`, {
      headers: headers,
      observe: 'response'
    }) as Observable<HttpResponse<T>>;
  }
}
