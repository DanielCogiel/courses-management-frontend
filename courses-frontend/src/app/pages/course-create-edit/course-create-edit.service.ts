import { Injectable } from '@angular/core';
import { ApiService } from "../../api/api.service";
import { UserCreateModel } from "./models/user-create-edit.model";

@Injectable({
  providedIn: 'root'
})
export class CourseCreateEditService {
  constructor(private _api: ApiService) {}
  addCourse(course: FormData) {
    return this._api.post<any>('/courses/add', course);
  }
  editCourse(id: string, course: FormData) {
    return this._api.put<any>(`/courses/edit/${id}`, course);
  }
  getCreators() {
    return this._api.get<UserCreateModel []>('/users/creators');
  }
  getCourse(id: string) {
    return this._api.get<any>(`/courses/${id}`);
  }
}
