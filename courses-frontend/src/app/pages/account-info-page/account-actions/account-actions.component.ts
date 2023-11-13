import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { PasswordChangeModalComponent } from "../../admin-page/password-change-modal/password-change-modal.component";
import { first, map, Observable, of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { UserDataService } from "../../../data-access/user/user-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import Role from "../../../data-access/role/role.enum";
import { AuthService } from "../../../auth/auth.service";
import { ConfirmationModalComponent } from "../../../components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-account-actions',
  templateUrl: './account-actions.component.html',
  styleUrls: ['./account-actions.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class AccountActionsComponent {
  canDeleteAccount$: Observable<boolean | undefined> = of(false);
  constructor(
    private _dialog: MatDialog,
    private _userDataService: UserDataService,
    private _auth: AuthService,
    private _snackbar: MatSnackBar
  ) {
    this._userDataService.user$.subscribe(user => {
      if (user?.role === Role.ADMIN)
        this.canDeleteAccount$ = this._userDataService
          .hasDeletionPermission()
          .pipe(
            first(),
            map(response => response.body),
            map(body => body?.canDeleteAccount)
          );
    })
  }
  openPasswordModal() {
    const changePasswordDialog = this._dialog.open(PasswordChangeModalComponent);
    changePasswordDialog
      .afterClosed()
      .pipe(first())
      .subscribe((result?: {password: string, confirmPassword: string}) => {
        if (result)
          this.changePassword(result);
      })
  }
  changePassword(passwords: {password: string, confirmPassword: string}) {
    this._userDataService
      .changePassword(passwords)
      .pipe(
        first(),
        map(response => response.body)
      ).subscribe({
      next: result => this._snackbar.open(result?.message ?? 'Pomyślnie zmieniono hasło.', 'Zamknij', {
        duration: 5 * 1000
      }), error: error => this._snackbar.open(error?.message ?? 'Nie udało się zmienić hasła.', 'Zamknij', {
        duration: 5 * 1000
      })
    })
  }
  openConfirmationDialog() {
    const confirmationDialog = this._dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Usuwanie konta',
        message: 'Czy na pewno chcesz usunąć swoje konto na tym portalu?'
      }
    })
    confirmationDialog
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result)
          this.deleteAccount();
      })
  }
  deleteAccount() {
    this._userDataService
      .deleteAccount()
      .pipe(
        first(),
        map(response => response.body)
      ).subscribe({
      next: result => {
        this._snackbar.open(result?.message ?? 'Usunięto konto.', 'Zamknij', {
        duration: 5 * 1000
        })
        this._auth.logout();
      }, error: error => this._snackbar.open(error?.message ?? 'Usunięcie konta nie powiodło się.', 'Zamknij', {
        duration: 5 * 1000
      })
    })
  }
}
