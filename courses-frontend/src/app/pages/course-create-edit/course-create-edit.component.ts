import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CourseCreateEditService } from "./course-create-edit.service";
import { first, map, Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Level } from "../../data-access/level/level.enum";
import { Language } from "../../data-access/language/language.enum";
import { UserCreateModel } from "./models/user-create-edit.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-course-create-edit',
  templateUrl: './course-create-edit.component.html',
  styleUrls: ['./course-create-edit.component.scss']
})
export class CourseCreateEditComponent {
  id?: string;
  formGroup: FormGroup = this._fb.group({
    title: ['', Validators.required],
    language: [Language.PL, Validators.required],
    level: [Level.BEGINNER, Validators.required],
    location: ['', Validators.required],
    trainer: ['', Validators.required],
    image: [null]
  });
  datetimes: {date: string, timeStart: string, timeFinish: string} [] = [];
  users$: Observable<UserCreateModel [] | null> = this._courseService.getCreators()
    .pipe(
      first(),
      map(response => response.body)
    )
  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseCreateEditService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute
  ) {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this._courseService.getCourse(id)
        .pipe(
          first(),
          map(response => response.body)
        )
        .subscribe(value => console.log(value));
    }
  }
  addCourse() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) return;

    let formData = new FormData();
    const {image, ...values} = this.formGroup.getRawValue();

    formData.append('image', image);
    formData.append('datetimes', JSON.stringify(this.datetimes));
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value + '');
    })

    this._courseService.addCourse(formData)
    .pipe(
      first(),
      map(response => response.body)
    )
    .subscribe({
      next: (response: {message: string}) => {
        this._snackbar.open(response.message || 'Udało się dodać kurs!', 'Zamknij', {
          duration: 5 * 1000
        })
      }, error: (response: {message: string}) => {
        this._snackbar.open(response.message || 'Nie udało się dodać kursu.', 'Zamknij', {
          duration: 5 * 1000
        })
      }
    })
  }
}
