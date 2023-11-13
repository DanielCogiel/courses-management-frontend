import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from "../../../data-access/user/user-data.service";
import { RoleBadgeComponent } from "../../../components/role-badge/role-badge.component";

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, RoleBadgeComponent],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {
  user$ = this._userDataService.user$;
  constructor(private _userDataService: UserDataService) {}
}
