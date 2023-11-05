import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { first, map, Observable } from "rxjs";
import { CourseAttendantModel } from "./course-attendant.model";
import { CourseDetailsPageService } from "../course-details-page.service";

@Component({
  selector: 'app-course-attendants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-attendants.component.html',
  styleUrls: ['./course-attendants.component.scss']
})
export class CourseAttendantsComponent implements OnInit {
  @Input() route = '/courses/attendants';
  @Input() id!: string | null;
  attendants$?: Observable<CourseAttendantModel[] | null>;
  constructor(private _detailsService: CourseDetailsPageService) {}
  ngOnInit() {
    this.attendants$ = this._detailsService
      .getAttendants(this.route, this.id)
      .pipe(
        first(),
        map(response => response.body)
      )
  }
}
