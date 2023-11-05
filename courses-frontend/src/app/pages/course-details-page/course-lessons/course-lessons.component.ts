import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { first, map, Observable } from "rxjs";
import { CourseDetailsPageService } from "../course-details-page.service";
import { CourseLessonModel } from "./course-lesson.model";

@Component({
  selector: 'app-course-lessons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.scss']
})
export class CourseLessonsComponent implements OnInit {
  @Input() route = '/courses/lessons';
  @Input() id!: string | null;
  lessons$?: Observable<CourseLessonModel[] | null>;
  constructor(private _detailsService: CourseDetailsPageService) {}
  ngOnInit() {
    this.lessons$ = this._detailsService
      .getLessons(this.route, this.id)
      .pipe(
        first(),
        map(response => response.body)
      )
  }
}
