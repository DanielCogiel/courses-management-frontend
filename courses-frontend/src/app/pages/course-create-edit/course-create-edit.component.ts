import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CourseCreateEditService } from "./course-create-edit.service";
import { finalize, first, map, Observable, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Level } from "../../data-access/level/level.enum";
import { Language } from "../../data-access/language/language.enum";
import { UserCreateModel } from "./models/user-create-edit.model";
import { ActivatedRoute, Router } from "@angular/router";
import { dateFormatter } from "../../utility/date-formatter.function";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { sortLessons } from "../../utility/sort-lessons.function";

@Component({
  selector: 'app-course-create-edit',
  templateUrl: './course-create-edit.component.html',
  styleUrls: ['./course-create-edit.component.scss']
})
export class CourseCreateEditComponent {
  loading: boolean = true;
  submitLoading: boolean = false;
  id?: string;
  formGroup: FormGroup = this._fb.group({
    title: ['', Validators.required],
    description: [''],
    language: [Language.PL, Validators.required],
    level: [Level.BEGINNER, Validators.required],
    location: ['', Validators.required],
    trainer_id: ['', Validators.required],
    image: [null]
  });
  datetimes: {title: string | null, description: string | null, date: string, timeStart: string, timeFinish: string} [] = [];
  users$: Observable<UserCreateModel [] | null> = this._courseService.getCreators()
    .pipe(
      first(),
      map(response => response.body)
    )
  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseCreateEditService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalService: MatDialog
  ) {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this._courseService.getCourse(id)
        .pipe(
          tap(() => this.loading = true),
          first(),
          map(response => response.body),
          finalize(() => this.loading = false)
        )
        .subscribe(value => {
          this.formGroup.patchValue(value);
          this.datetimes = value.datetimes.map((datetime: {date: string, timeStart: string, timeFinish: string}) => {
            const timeStart = datetime.timeStart;
            const timeFinish = datetime.timeFinish;
            return {
              ...datetime,
              date: dateFormatter(new Date(datetime.date)),
              timeStart: timeStart.slice(0, timeStart.lastIndexOf(':')),
              timeFinish: timeFinish.slice(0, timeFinish.lastIndexOf(':'))
            }
          });
        });
    } else
      this.loading = false;
  }
  submitCourse() {
    if (this.id)
      this.updateCourse();
    else
      this.addCourse();
  }
  addCourse() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) return;

    let formData = new FormData();
    const {image, ...values} = this.formGroup.getRawValue();
    console.log(this.datetimes)
    formData.append('image', image);
    formData.append('datetimes', JSON.stringify(this.datetimes));
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value + '');
    })

    this._courseService.addCourse(formData)
    .pipe(
      tap(() => this.submitLoading = true),
      first(),
      map(response => response.body),
      finalize(() => this.submitLoading = false)
    )
    .subscribe({
      next: (response: {message: string}) => {
        this._snackbar.open(response.message || 'Udało się dodać kurs!', 'Zamknij', {
          duration: 5 * 1000
        })
        this._router.navigate(['kursy']);
      }, error: (error) => {
        this._snackbar.open(error.error.message || 'Nie udało się dodać kursu.', 'Zamknij', {
          duration: 5 * 1000
        })
      }
    })
  }
  updateCourse() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid || !this.id) return;

    let formData = new FormData();
    const {image, ...values} = this.formGroup.getRawValue();

    if (image)
      formData.append('image', image);
    formData.append('datetimes', JSON.stringify(this.datetimes));
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value + '');
    })

    this._courseService.editCourse(this.id, formData)
      .pipe(
        tap(() => this.submitLoading = true),
        first(),
        map(response => response.body),
        finalize(() => this.submitLoading = false)
      )
      .subscribe({
        next: (response: {message: string}) => {
          this._snackbar.open(response.message || 'Udało się dodać kurs!', 'Zamknij', {
            duration: 5 * 1000
          })
          this._router.navigate(['kursy']);
        }, error: (error) => {
          this._snackbar.open(error.error.message || 'Nie udało się dodać kursu.', 'Zamknij', {
            duration: 5 * 1000
          })
        }
      })
  }
  backClicked() {
    if (this.formGroup.dirty || this._courseService.lessonsDirty$.getValue()) {
      const confirmationModal = this._modalService.open(ConfirmationModalComponent, {
        data: {
          title: 'Potwierdź decyzję',
          message: 'Czy na pewno chcesz zakończyć edycję kursu? Utracisz wszystkie zmiany.'
        }
      })
      confirmationModal
        .afterClosed()
        .pipe(first())
        .subscribe(result => {
          if (result)
            this._router.navigate(['kursy']);
        })
    } else {
      this._router.navigate(['kursy'])
    }
  }
}
