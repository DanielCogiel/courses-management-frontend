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
import { Router, RouterLink } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { CoursesFiltersComponent, CoursesFiltersModel } from "./courses-filters/courses-filters.component";
import User from "../../data-access/user/user.model";

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CourseComponent, LoaderComponent, CoursesFiltersComponent],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnDestroy {
  loading: boolean = true;
  refresh$ = this._coursesService.refresh$;
  destroy$: Subject<void> = new Subject<void>();
  filters: CoursesFiltersModel = {title: '', level: undefined, language: undefined, dateStart: undefined, dateFinish: undefined};
  isPersonalPage = this._router.url === '/kursy/moje';
  data$: Observable<CourseModel [] | null> = this.refresh$
    .pipe(
      tap(() => this.loading = true),
      switchMap(() =>
        this.isPersonalPage ? this._coursesService.getPersonalCourses() : this._coursesService.getCourses()),
      map(response => response.body),
      tap(() => this.loading = false),
      takeUntil(this.destroy$)
    )
  data: CourseModel [] | null = null;
  constructor(
    private _coursesService: CoursesPageService,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.data$.subscribe(data => this.data = data);
  }
  openConfirmationModal(id: string) {
    const confirmationDialog = this._dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Usuwanie kursu',
        message: 'Czy na pewno chcesz usunąć ten kurs?'
      }
    })
    confirmationDialog
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result)
          this.deleteCourse(id);
      })
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
  enrollUserToCourse(id: string) {
    this._coursesService
      .enrollUserToCourse(id)
      .pipe(
        first(),
        map(response => response.body)
      ).subscribe({
      next: (value) => {
        this._snackbar.open(value?.message ?? 'Udało się zapisać do kursu!', 'Zamknij', {
          duration: 5 * 1000
        })
        this._coursesService.refresh();
      }, error: error => {
        this._snackbar.open(error?.error?.message ?? 'Nie udało się zapisać Cię do kursu.', 'Zamknij', {
          duration: 5 * 1000
        })
      }
    })
  }
  leaveUserFromCourse(id: string) {
    this._coursesService
      .leaveUserFromCourse(id)
      .pipe(
        first(),
        map(response => response.body)
      ).subscribe({
      next: (value) => {
        this._snackbar.open(value?.message ?? 'Wypisano cię z kursu.', 'Zamknij', {
          duration: 5 * 1000
        })
        this._coursesService.refresh();
      }, error: error => {
        this._snackbar.open(error?.error?.message ?? 'Nie udało się wypisać Cię z kursu.', 'Zamknij', {
          duration: 5 * 1000
        })
      }
    })
  }
  getFilteredCourses() {
    return this.data?.filter((course: CourseModel) => {
      let shouldAdd = true;
      Object.keys(this.filters).forEach(key => {
        // @ts-ignore
        if (this.filters[key] && key === 'dateStart') {
          const date = new Date();
          const segments = course.firstLesson?.date.split('-').map(str => parseInt(str));
          const timeSegments = course.firstLesson?.timeStart.split(':').map(str => parseInt(str));
          if (segments && timeSegments) {
            date.setFullYear(segments[0]);
            date.setMonth(segments[1]);
            date.setDate(segments[2]);
            date.setHours(timeSegments[0]);
            date.setMinutes(timeSegments[1]);
          }
          console.log(date)
          console.log(this.filters[key])
          // @ts-ignore
          shouldAdd = date.getTime() > (this.filters[key] as Date).getTime();
        }
        // @ts-ignore
        if (typeof course[key] === 'string' && this.filters[key] && !course[key].includes(this.filters[key])) {
          shouldAdd = false;
        }
      })
      return shouldAdd;
    })
  }
  applyFilters(filters: CoursesFiltersModel) {
    this.filters = filters;
    console.log(this.filters)
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
