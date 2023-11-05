import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsPageService } from "../course-details-page.service";
import { finalize, first, map, Observable } from "rxjs";
import { CourseDetailsModel } from "./course-details.model";
import { SERVER_URL } from "../../../api/api.config";
import { getLevelLabel } from "../../../utility/get-level-label.function";
import { getLanguageLabel } from "../../../utility/get-language-label.function";

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
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private _detailsService: CourseDetailsPageService) {}
  ngOnInit() {
    this.loading.emit(true);
    this.details$ = this._detailsService
      .getDetails(this.route, this.id)
      .pipe(
        first(),
        map(response => response.body),
        finalize(() => this.loading.emit(false))
      )
  }
  getImageUrl(url: string) {
    return `${SERVER_URL}/${url}`;
  }

  protected readonly getLevelLabel = getLevelLabel;
  protected readonly getLanguageLabel = getLanguageLabel;
}
