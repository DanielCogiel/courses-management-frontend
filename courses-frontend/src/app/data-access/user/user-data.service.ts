import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import User from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  setUser(user: User | null) {
    this.user$.next(user);
  }
}
