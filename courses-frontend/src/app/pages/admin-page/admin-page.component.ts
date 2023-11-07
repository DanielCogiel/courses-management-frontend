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

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, LoaderComponent]
})
export class AdminPageComponent implements OnDestroy {
  columns = ['firstName', 'lastName', 'username', 'email', 'actions'];
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
  constructor(private _adminService: AdminPageService, private _snackbar: MatSnackBar) {
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
