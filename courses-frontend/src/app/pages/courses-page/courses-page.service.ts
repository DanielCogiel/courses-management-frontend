import { Injectable } from '@angular/core';
import { ApiService } from "../../api/api.service";
import CourseModel from "./course/course.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursesPageService {
  refresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _api: ApiService) {}
  getCourses() {
    return this._api.get<CourseModel[]>('/courses/all');
  }
  getPersonalCourses() {
    return this._api.get<CourseModel[]>('/courses/personal');
  }
  deleteCourse(id: string) {
    return this._api.delete<{message: string}>(`/courses/delete/${id}`);
  }
  enrollUserToCourse(id: string) {
    return this._api.post<{message: string}>(`/enroll/${id}`);
  }
  leaveUserFromCourse(id: string) {
    return this._api.delete<{message: string}>(`/leave/${id}`);
  }
  refresh() {
    this.refresh$.next(true);
  }
}
