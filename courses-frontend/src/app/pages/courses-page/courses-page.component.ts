import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../api/api.service";
import { finalize, first, map, Observable, Subject, switchMap, takeUntil, tap } from "rxjs";
import CourseModel from "./course/course.model";
import { CoursesPageService } from "./courses-page.service";
import { CourseComponent } from "./course/course.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CourseComponent, LoaderComponent, RouterLink],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnDestroy {
  loading: boolean = true;
  refresh$ = this._coursesService.refresh$;
  destroy$: Subject<void> = new Subject<void>();
  data$: Observable<CourseModel [] | null> = this.refresh$
    .pipe(
      tap(() => this.loading = true),
      switchMap(() => this._coursesService.getCourses()),
      map(response => response.body),
      tap(() => this.loading = false),
      takeUntil(this.destroy$)
    )
  data: CourseModel [] | null = null;
  constructor(
    private _coursesService: CoursesPageService,
    private _snackbar: MatSnackBar
  ) {
    this.data$.subscribe(data => this.data = data);
  }
  deleteCourse(id: string) {
    this._coursesService
      .deleteCourse(id)
      .pipe(
        first(),
        map(response => response.body)
      )
      .subscribe({
        next: (value) => {
          this._snackbar.open(value?.message ?? 'Pomyślnie usunięto kurs.', 'Zamknij', {
            duration: 5 * 1000
          })
          this._coursesService.refresh();
        }, error: () => {
          this._snackbar.open('Nie udało się usunąć kursu.', 'Zamknij', {
            duration: 5 * 1000
          })
        }
      })
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
