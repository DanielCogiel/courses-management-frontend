import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import Role from "../data-access/role/role.enum";
import { RoleService } from "../data-access/role/role.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  role = this._roleService.getRole();
  constructor(
    private _router: Router,
    private _roleService: RoleService
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = next.data['roles'] as Role[];

    if (this.role) {
      if (!roles.includes(this.role)) {
        this._router.navigate(['kursy']);
        return false;
      } else
        return true;
    } else {
      return false;
    }
  }
}
