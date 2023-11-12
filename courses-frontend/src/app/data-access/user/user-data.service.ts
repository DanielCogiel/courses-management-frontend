import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import User from "./user.model";
import { ApiService } from "../../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  constructor(private _api: ApiService) {}
  setUser(user: User | undefined) {
    this.user$.next(user);
  }
  getUser() {
    return this._api.get<{data: User} | undefined>('/users/me');
  }
}
