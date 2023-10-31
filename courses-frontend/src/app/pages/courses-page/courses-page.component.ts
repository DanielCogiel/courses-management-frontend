import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../api/api.service";
import { finalize, first, map, Observable, Subject, switchMap, takeUntil, tap } from "rxjs";
import CourseModel from "./course/course.model";
import { CoursesPageService } from "./courses-page.service";
import { CourseComponent } from "./course/course.component";

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CourseComponent],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnDestroy {
  loading: boolean = false;
  refresh$ = this._coursesService.refresh$;
  destroy$: Subject<void> = new Subject<void>();
  data$: Observable<CourseModel [] | null> = this.refresh$
    .pipe(
      tap(() => this.loading = true),
      switchMap(() => this._coursesService.getCourses()),
      map(response => response.body),
      finalize(() => this.loading = false),
      takeUntil(this.destroy$)
    )
  constructor(private _coursesService: CoursesPageService) {}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
