import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import Role from "./role.enum";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role$: BehaviorSubject<Role | null | undefined> = new BehaviorSubject<Role | null | undefined>(null);
  setRole(role?: Role | null) {
    this.role$.next(role);
  }
  getRole() {
    return this.role$.getValue();
  }
  constructor() { }
}
