import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCreateEditComponent } from './course-create-edit.component';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CourseCreateEditFormComponent } from './course-create-edit-form/course-create-edit-form.component';

@NgModule({
  declarations: [
    CourseCreateEditComponent,
    CourseCreateEditFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'edytuj',
        component: CourseCreateEditComponent
      },
      {
        path: 'utworz',
        component: CourseCreateEditComponent
      }
    ]),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class CourseCreateEditModule { }
