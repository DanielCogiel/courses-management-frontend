import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsPageService } from "../course-details-page.service";
import { first, map, Observable } from "rxjs";
import { CourseDetailsModel } from "./course-details.model";
import { SERVER_URL } from "../../../api/api.config";

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  @Input() route = '/courses/details';
  @Input() id!: string | null;
  details$?: Observable<CourseDetailsModel | null>;
  constructor(private _detailsService: CourseDetailsPageService) {}
  ngOnInit() {
    this.details$ = this._detailsService
      .getDetails(this.route, this.id)
      .pipe(
        first(),
        map(response => response.body)
      )
  }
  getImageUrl(url: string) {
    return `${SERVER_URL}/${url}`;
  }
}
