import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import Role from "./role.enum";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role$: BehaviorSubject<Role | null | undefined> = new BehaviorSubject<Role | null | undefined>(localStorage.getItem('role') as Role | null);
  setRole(role?: Role | null) {
    this.role$.next(role);
    if (role)
      localStorage.setItem('role', role);
    else
      localStorage.removeItem('role');
  }
  getRole() {
    return this.role$.getValue();
  }
}
