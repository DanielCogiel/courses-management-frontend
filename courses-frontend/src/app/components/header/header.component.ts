import { Component } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { RoleService } from "../../data-access/role/role.service";
import { UserDataService } from "../../data-access/user/user-data.service";
import { MobileCheckService } from "../../mobile/mobile-check.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMobile$ = this._mobileService.isMobile$;
  sidebarOpened: boolean = false;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _roleService: RoleService,
    private _userDataService: UserDataService,
    private _mobileService: MobileCheckService
  ) {}
  logout() {
    this._auth.logout();
  }
}
