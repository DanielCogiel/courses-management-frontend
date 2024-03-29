import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { first, map, Observable, Subject, switchMap, takeUntil, tap } from "rxjs";
import CourseModel from "./course/course.model";
import { CoursesPageService } from "./courses-page.service";
import { CourseComponent } from "./course/course.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { CoursesFiltersComponent, CoursesFiltersModel } from "./courses-filters/courses-filters.component";
import Correlation from "./courses-filters/correlation.enum";

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
  filtersStrKeys = ['title', 'level', 'language']
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
  private _isDateGreater(dateFromData?: string, dateFromFilter?: Date) {
    if (!dateFromFilter)
      return true;
    if (!dateFromData)
      return false;

    const dateData = dateFromData.split('T')[0];
    const dateFilter = dateFromFilter.toISOString().split('T')[0];

    const [dataYear, dataMonth, dataDay] = dateData.split('-').map(str => parseInt(str));
    let [filterYear, filterMonth, filterDay] = dateFilter.split('-').map(str => parseInt(str));
    filterDay++;

    if (dataYear === filterYear) {
      if (dataMonth === filterMonth) {
        return dataDay >= filterDay;
      }
      return dataMonth > filterMonth;
    }
    return dataYear > filterYear
  }
  private _isDateLesser(dateFromData?: string, dateFromFilter?: Date) {
    if (!dateFromFilter)
      return true;
    if (!dateFromData)
      return false;

    const dateData = dateFromData.split('T')[0];
    const dateFilter = dateFromFilter.toISOString().split('T')[0];

    const [dataYear, dataMonth, dataDay] = dateData.split('-').map(str => parseInt(str));
    let [filterYear, filterMonth, filterDay] = dateFilter.split('-').map(str => parseInt(str));
    filterDay++;

    if (dataYear === filterYear) {
      if (dataMonth === filterMonth) {
        return dataDay <= filterDay;
      }
      return dataMonth < filterMonth;
    }
    return dataYear < filterYear
  }
  private _isDateLesserThanToday(dateFromData?: string) {
    if (!dateFromData)
      return false;

    const today = new Date();
    const dateData = dateFromData.split('T')[0];

    let [dataYear, dataMonth, dataDay] = dateData.split('-').map(str => parseInt(str));
    dataDay++;

    if (dataYear === today.getFullYear()) {
      if (dataMonth === today.getMonth() + 1) {
        return dataDay <= today.getDate();
      }
      return dataMonth < today.getMonth() + 1;
    }
    return dataYear < today.getFullYear();
  }
  private _getCourseCorrelation(course: CourseModel, corr: Correlation) {
    switch(corr) {
      case Correlation.OWNER:
        return course.isOwner;
      case Correlation.TRAINER:
        return course.isTrainer;
      case Correlation.STUDENT:
        return course.isEnrolled;
    }
  }
  getFilteredCourses() {
    const filteredWithCorrelation = this.data?.filter((course: CourseModel) => {
      if (!this.filters.correlation)
        return true;

      return this._getCourseCorrelation(course, this.filters.correlation);
    })

    const filteredWithStatus = filteredWithCorrelation?.filter((course: CourseModel) => {
      if (this.filters.status === null || this.filters.status === undefined)
        return true;

      return this.filters.status === 'active' ? !this._isDateLesserThanToday(course.lastLesson?.date)
        : this._isDateLesserThanToday(course.lastLesson?.date) ;
    })

    const filteredWithDates = filteredWithStatus?.filter((course: CourseModel) => {
      return this._isDateGreater(course.firstLesson?.date, this.filters.dateStart as unknown as Date)
        && this._isDateLesser(course.lastLesson?.date, this.filters.dateFinish as unknown as Date)
    })

    return filteredWithDates?.filter((course: CourseModel) => {
      let shouldAdd = true;
      this.filtersStrKeys.forEach(key => {
        // @ts-ignore
        if (this.filters[key] && !course[key].includes(this.filters[key])) {
          shouldAdd = false;
        }
      })
      return shouldAdd;
    })
  }
  applyFilters(filters: CoursesFiltersModel) {
    this.filters = filters;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
