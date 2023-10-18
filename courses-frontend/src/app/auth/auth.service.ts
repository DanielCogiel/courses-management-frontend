import { Injectable } from '@angular/core';
import Role from "../data-access/role/role.enum";
import { ApiService } from "../api/api.service";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _apiService: ApiService, private _cookieService: CookieService) {}
  login(data: {username: string, password: string}) {
    return this._apiService.post<{message: string, token: string | null, role?: Role}>('/login', data);
  }
  register(data: any) {
    return this._apiService.post<{message?: string}>('/register', data);
  }
  setAccessToken(token?: string | null) {
    if (token)
      localStorage.setItem('token', token);
  }
  destroyAccessToken() {
    localStorage.removeItem('token');
  }
  clearRefreshToken() {
    this._cookieService.delete('refresh-token');
  }
}
