import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { AccountActionsComponent } from "./account-actions/account-actions.component";

@Component({
  selector: 'app-account-info-page',
  templateUrl: './account-info-page.component.html',
  styleUrls: ['./account-info-page.component.scss'],
  standalone: true,
  imports: [CommonModule, AccountDetailsComponent, AccountActionsComponent]
})
export class AccountInfoPageComponent {}
