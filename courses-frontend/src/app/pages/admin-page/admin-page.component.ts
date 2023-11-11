import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { ApiService } from "../../api/api.service";
import User from "../../data-access/user/user.model";
import { BehaviorSubject, finalize, first, map, Subject, switchMap, takeUntil, tap } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LoaderComponent } from "../../components/loader/loader.component";
import { AdminPageService } from "./admin-page.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { UserDataService } from "../../data-access/user/user-data.service";
import { RoleBadgeComponent } from "../../components/role-badge/role-badge.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, LoaderComponent, RoleBadgeComponent]
})
export class AdminPageComponent implements OnDestroy {
  user$ = this._userDataService.user$
  columns = ['firstName', 'lastName', 'username', 'email', 'role', 'actions'];
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
}
