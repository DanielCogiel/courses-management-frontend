import { Component } from '@angular/core';
import { UserDataService } from "../../../data-access/user/user-data.service";
import { first, map, Observable } from "rxjs";
import User from "../../../data-access/user/user.model";

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent {
  user$: Observable<User | undefined> = this._userDataService.getUser().pipe(
    first(),
    map(response => response.body),
    map(data => data?.data)
  );
  constructor(private _userDataService: UserDataService) {}
}
