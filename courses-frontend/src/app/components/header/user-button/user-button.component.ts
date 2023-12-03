import { Component } from '@angular/core';
import { UserDataService } from "../../../data-access/user/user-data.service";
import { first, map, Observable, tap } from "rxjs";
import User from "../../../data-access/user/user.model";
import { MobileCheckService } from "../../../mobile/mobile-check.service";

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent {
  isMobile$ = this._mobileService.isMobile$;
  user$: Observable<User | undefined> = this._userDataService.getUser().pipe(
    first(),
    map(response => response.body),
    map(data => data?.data),
    tap(user => this._userDataService.setUser(user))
  );
  constructor(
    private _userDataService: UserDataService,
    private _mobileService: MobileCheckService
  ) {}
}
