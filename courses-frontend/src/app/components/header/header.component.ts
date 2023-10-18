import { Component } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { RoleService } from "../../data-access/role/role.service";
import { UserDataService } from "../../data-access/user/user-data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _roleService: RoleService,
    private _userDataService: UserDataService
  ) {}
  logout() {
    this._auth.destroyAccessToken();
    this._auth.clearRefreshToken();
    this._roleService.setRole(null);
    this._userDataService.setUser(null);
    this._router.navigate(['login']);
  }
}
