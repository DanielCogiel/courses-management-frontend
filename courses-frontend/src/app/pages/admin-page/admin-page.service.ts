import { Injectable } from '@angular/core';
import User from "../../data-access/user/user.model";
import { ApiService } from "../../api/api.service";
import Role from "../../data-access/role/role.enum";

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {
  constructor(private _api: ApiService) {}
  getUsers() {
    return this._api.get<User[]>('/users');
  }
  deleteUser(id: string) {
    return this._api.delete<{message: string}>(`/users/delete/${id}`);
  }
  changePassword(username: string, passwords: {password: string, confirmPassword: string}) {
    return this._api.put<{message: string}>(`/changePassword/${username}`, passwords);
  }
  changeRole(username: string, role: Role) {
    return this._api.put<{message: string}>(`/changeRole/${username}`, { role: role });
  }
}
