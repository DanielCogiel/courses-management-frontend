import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import User from "./user.model";
import { ApiService } from "../../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private _api: ApiService) {}
  setUser(user: User | null) {
    this.user$.next(user);
  }
  getUser() {
    return this._api.get<{data: User} | undefined>('/users/me');
  }
}
