import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import User from "../../data-access/user/user.model";
import { BehaviorSubject, first, map, Subject, switchMap, takeUntil, tap } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LoaderComponent } from "../../components/loader/loader.component";
import { AdminPageService } from "./admin-page.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { UserDataService } from "../../data-access/user/user-data.service";
import { RoleBadgeComponent } from "../../components/role-badge/role-badge.component";
import { PasswordChangeModalComponent } from "./password-change-modal/password-change-modal.component";
import { PermissionChangeModalComponent } from "./permission-change-modal/permission-change-modal.component";
import Role from "../../data-access/role/role.enum";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AdminPageFiltersComponent } from "./admin-page-filters/admin-page-filters.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, LoaderComponent, RoleBadgeComponent, MatTooltipModule, AdminPageFiltersComponent]
})
export class AdminPageComponent implements OnDestroy {
  user$ = this._userDataService.user$
  columns = ['firstName', 'lastName', 'username', 'email', 'role', 'actions'];
  filters: {username: string | null, role: Role | null} = {username: '', role: null};
  reset$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  destroy$: Subject<void> = new Subject<void>();
  loading: boolean = false;
  users$ = this.reset$
    .pipe(
      tap(() => this.loading = true),
      takeUntil(this.destroy$),
      switchMap(() => this._adminService.getUsers()),
      map(response => response.body),
    )
  users: User[] | null = null;
  constructor(
    private _adminService: AdminPageService,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _userDataService: UserDataService
  ) {
    this.users$.subscribe(data => {
      this.users = data;
      this.loading = false;
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  _refresh() {
    this.reset$.next(true);
  }
  applyFilters(filters: {username: string | null, role: Role | null}) {
    this.filters = filters;
  }
  getFilteredUsers(): User[] | undefined {
    return this.users?.filter((user: User) => {
      let shouldAdd = true;
      Object.keys(this.filters).forEach(key => {
        // @ts-ignore
        if (this.filters[key] && !user[key].includes(this.filters[key])) {
          shouldAdd = false;
        }
      })
      return shouldAdd;
    })
  }
  openPasswordModal(username: string) {
    const changePasswordDialog = this._dialog.open(PasswordChangeModalComponent);
    changePasswordDialog
      .afterClosed()
      .pipe(first())
      .subscribe((result?: {password: string, confirmPassword: string}) => {
        if (result)
          this.changePassword(username, result);
      })
  }
  changePassword(username: string, passwords: {password: string, confirmPassword: string}) {
    this._adminService
      .changePassword(username, passwords)
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
  openConfirmationDialog(id: string) {
    const confirmationDialog = this._dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Usuwanie użytkownika',
        message: 'Czy na pewno chcesz usunąć tego użytkownika?'
      }
    })
    confirmationDialog
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result)
          this.deleteUser(id)
      })
  }
  deleteUser(id: string) {
    this._adminService.deleteUser(id)
      .pipe(
        first(),
        map(response => response.body)
      )
      .subscribe({
        next: (result) => {
          this._refresh();
          this._snackbar.open(result?.message ?? 'Nie udało się usunąć użytkownika.', 'Zamknij', {
            duration: 5 * 1000
          })
        }, error: (error) => this._snackbar.open(error?.error?.message ?? 'Nie udało się usunąć użytkownika.', 'Zamknij', {
          duration: 5 * 1000
        })
      })
  }
  openRoleSwapModal(username: string, role: Role) {
    const roleSwapDialog = this._dialog.open(PermissionChangeModalComponent, {
      data: { currentRole: role }
    });
    roleSwapDialog
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result)
          this._adminService
            .changeRole(username, result)
            .pipe(
              first(),
              map(response => response.body)
            ).subscribe({
            next: result => {
              this._snackbar.open(result?.message ?? 'Pomyślnie zmieniono rolę użytkownika.', 'Zamknij', {
                duration: 5 * 1000
              })
              this._refresh();
            }, error: error => this._snackbar.open(error.error?.message ?? 'Nie udało się zmienić roli użytkownika.', 'Zamknij', {
              duration: 5 * 1000
            })
          })
      })
  }
}
