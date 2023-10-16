import { Injectable } from '@angular/core';
import Role from "./models/role.enum";
import { ApiService } from "../api/api.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role$: BehaviorSubject<Role | null> = new BehaviorSubject<Role | null>(null);
  constructor(private _apiService: ApiService) {}
  login(data: {username: string, password: string}) {
    return this._apiService.post<{message: string, token: string | null, role?: Role}>('/login', data);
  }
  register(data: any) {
    return this._apiService.post<{message?: string}>('/register', data);
  }
  setRole(role?: Role | null) {
    this.role$.next(role || null);
  }
  setToken(token?: string | null) {
    if (token)
      localStorage.setItem('token', token);
  }
  destroyToken() {
    localStorage.removeItem('token');
  }
}
