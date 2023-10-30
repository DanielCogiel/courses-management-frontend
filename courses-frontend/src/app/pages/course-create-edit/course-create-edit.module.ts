import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCreateEditComponent } from './course-create-edit.component';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CourseCreateEditFormComponent } from './course-create-edit-form/course-create-edit-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatChipsModule } from "@angular/material/chips";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { LoaderComponent } from "../../components/loader/loader.component";

@NgModule({
  declarations: [
    CourseCreateEditComponent,
    CourseCreateEditFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'edytuj/:id',
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    LoaderComponent,
  ]
})
export class CourseCreateEditModule { }
