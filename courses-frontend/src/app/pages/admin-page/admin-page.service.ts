import { Injectable } from '@angular/core';
import User from "../../data-access/user/user.model";
import { ApiService } from "../../api/api.service";

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
}
