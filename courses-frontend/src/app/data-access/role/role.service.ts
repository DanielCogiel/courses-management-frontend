import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import Role from "./role.enum";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role$: BehaviorSubject<Role | null> = new BehaviorSubject<Role | null>(null);
  setRole(role: Role | null) {
    this.role$.next(role);
  }
  constructor() { }
}
