import { Injectable } from '@angular/core';
import Role from "../data-access/role/role.enum";
import { ApiService } from "../api/api.service";
import { CookieService } from "ngx-cookie-service";
import { RoleService } from "../data-access/role/role.service";
import { UserDataService } from "../data-access/user/user-data.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _apiService: ApiService,
    private _cookieService: CookieService,
    private _roleService: RoleService,
    private _userDataService: UserDataService,
    private _router: Router
  ) {}
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
  logout() {
    this.destroyAccessToken();
    this.clearRefreshToken();
    this._roleService.setRole(null);
    this._router.navigate(['login']);
  }
}
