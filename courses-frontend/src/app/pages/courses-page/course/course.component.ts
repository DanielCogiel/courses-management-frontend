import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import CourseModel from "./course.model";
import { SERVER_URL } from "../../../api/api.config";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() data?: CourseModel;
  getImageUrl() {
    return `${SERVER_URL}/${this.data?.image_path}`;
  }
}
