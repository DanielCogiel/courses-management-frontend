import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, first, map, Observable } from "rxjs";
import { CourseDetailsPageService } from "../course-details-page.service";
import { CourseLessonModel } from "./course-lesson.model";
import { MatExpansionModule } from "@angular/material/expansion";
import { dateFormatter } from "../../../utility/date-formatter.function";
import { LoaderComponent } from "../../../components/loader/loader.component";

@Component({
  selector: 'app-course-lessons',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, LoaderComponent],
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.scss']
})
export class CourseLessonsComponent implements OnInit {
  @Input() route = '/courses/lessons';
  @Input() id!: string | null;
  lessons$?: Observable<CourseLessonModel[] | null>;
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private _detailsService: CourseDetailsPageService) {}
  ngOnInit() {
    this.loading.emit(true);
    this.lessons$ = this._detailsService
      .getLessons(this.route, this.id)
      .pipe(
        first(),
        map(response => response.body),
        finalize(() => this.loading.emit(false))
      )
  }
  getFormattedDate(date: string) {
    return dateFormatter(new Date(date));
  }
}
