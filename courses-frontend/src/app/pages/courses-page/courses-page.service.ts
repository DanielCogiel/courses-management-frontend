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
  refresh() {
    this.refresh$.next(true);
  }
}
