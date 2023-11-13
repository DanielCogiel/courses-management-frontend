import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import CourseModel from "./course.model";
import { SERVER_URL } from "../../../api/api.config";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { getLanguageLabel } from "../../../utility/get-language-label.function";
import { getLevelLabel } from "../../../utility/get-level-label.function";
import { RouterLink } from "@angular/router";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink, MatTooltipModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onView: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEnroll: EventEmitter<any> = new EventEmitter<any>();
  @Input() data?: CourseModel;
  readonly getLanguageLabel = getLanguageLabel
  readonly getLevelLabel = getLevelLabel;

  getImageUrl() {
    return `${SERVER_URL}/${this.data?.image_path}`;
  }
  deleteClicked() {
    this.onDelete.emit();
  }
  editClicked() {
    this.onEdit.emit();
  }
  viewClicked() {
    this.onView.emit();
  }
  enrollClicked() {
    this.onEnroll.emit();
  }
}
