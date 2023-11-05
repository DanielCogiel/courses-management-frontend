import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, first, map, Observable } from "rxjs";
import { CourseAttendantModel } from "./course-attendant.model";
import { CourseDetailsPageService } from "../course-details-page.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-course-attendants',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './course-attendants.component.html',
  styleUrls: ['./course-attendants.component.scss']
})
export class CourseAttendantsComponent implements OnInit {
  @Input() route = '/courses/attendants';
  @Input() id!: string | null;
  attendants$?: Observable<CourseAttendantModel[] | null>;
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private _detailsService: CourseDetailsPageService) {}
  ngOnInit() {
    this.loading.emit(true);
    this.attendants$ = this._detailsService
      .getAttendants(this.route, this.id)
      .pipe(
        first(),
        map(response => response.body),
        finalize(() => this.loading.emit(false))
      )
  }
}
