import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { CourseAttendantsComponent } from "./course-attendants/course-attendants.component";
import { CourseLessonsComponent } from "./course-lessons/course-lessons.component";

@Component({
  selector: 'app-course-details-page',
  standalone: true,
  imports: [CommonModule, CourseDetailsComponent, CourseAttendantsComponent, CourseLessonsComponent],
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.scss']
})
export class CourseDetailsPageComponent {
  id: string | null = this._route.snapshot.paramMap.get('id');
  constructor(private _route: ActivatedRoute) {}
}
