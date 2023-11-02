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
  deleteCourse(id: string) {
    return this._api.delete<{message: string}>(`/courses/delete/${id}`);
  }
  refresh() {
    this.refresh$.next(true);
  }
}
