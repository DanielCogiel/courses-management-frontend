import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-course-create-edit',
  templateUrl: './course-create-edit.component.html',
  styleUrls: ['./course-create-edit.component.scss']
})
export class CourseCreateEditComponent {
  formGroup: FormGroup = this._fb.group({
    title: ['', Validators.required],
    language: ['', Validators.required],
    level: ['', Validators.required],
    location: ['', Validators.required],
    trainer: ['', Validators.required],
    datetimes: this._fb.array([])
  });

  constructor(private _fb: FormBuilder) {}
}
