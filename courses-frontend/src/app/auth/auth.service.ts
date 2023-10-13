import { Injectable } from '@angular/core';
import Role from "./models/role.enum";
import { ApiService } from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _apiService: ApiService) {}
  login(data: {username: string, password: string}) {
    return this._apiService.post<{token: string | null, role?: Role}>('/login', data);
  }
  register(data: any) {
    return this._apiService.post<{message?: string}>('/register', data);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  destroyToken() {
    localStorage.removeItem('token');
  }
}
