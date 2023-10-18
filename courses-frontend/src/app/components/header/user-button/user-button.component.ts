import { Component } from '@angular/core';
import { UserDataService } from "../../../data-access/user/user-data.service";
import { Observable } from "rxjs";
import User from "../../../data-access/user/user.model";

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent {
  user$: Observable<User | null> = this._userDataService.user$.asObservable();
  constructor(private _userDataService: UserDataService) {}
}
