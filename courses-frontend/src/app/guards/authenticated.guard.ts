import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');

    if (!token) this._router.navigate(['login']);
    return !!token;
  }
}
