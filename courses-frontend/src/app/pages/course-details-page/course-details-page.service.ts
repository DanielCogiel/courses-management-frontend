import { Injectable } from '@angular/core';
import { ApiService } from "../../api/api.service";
import { CourseDetailsModel } from "./course-details/course-details.model";
import { CourseAttendantModel } from "./course-attendants/course-attendant.model";
import { CourseLessonModel } from "./course-lessons/course-lesson.model";

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsPageService {
  constructor(private _api: ApiService) {}
  getDetails(route: string, id: string | null) {
    return this._api.get<CourseDetailsModel>(`${route}/${id}`);
  }
  getAttendants(route: string, id: string | null) {
    return this._api.get<CourseAttendantModel[]>(`${route}/${id}`);
  }
  getLessons(route: string, id: string | null) {
    return this._api.get<CourseLessonModel[]>(`${route}/${id}`);
  }
}
