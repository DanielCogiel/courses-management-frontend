import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorHandlerForm } from "../../../errors/custom-errors";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DateAdapter } from "@angular/material/core";
import { roles } from "../../../data-access/role/role.enum";
import { levels } from "../../../data-access/level/level.enum";
import { languages } from "../../../data-access/language/language.enum";
import { UserCreateModel } from "../models/user-create-edit.model";
import { MatDialog } from "@angular/material/dialog";
import { AddLessonModalComponent } from "../add-lesson-modal/add-lesson-modal.component";
import { first } from "rxjs";
import { CourseLessonModel } from "../../course-details-page/course-lessons/course-lesson.model";
import { dateFormatter } from "../../../utility/date-formatter.function";
import { sortLessons } from "../../../utility/sort-lessons.function";

@Component({
  selector: 'app-course-create-edit-form',
  templateUrl: './course-create-edit-form.component.html',
  styleUrls: ['./course-create-edit-form.component.scss']
})
export class CourseCreateEditFormComponent extends ErrorHandlerForm {
  @Input() formGroup?: FormGroup;
  @Input() datetimes: {title: string | null, description: string | null, date: string, timeStart: string, timeFinish: string} [] = [];
  @Input() users: UserCreateModel [] | null = null;
  readonly levels = levels;
  readonly languages = languages;
  constructor(
    private _fb: FormBuilder,
    private _dateAdapter: DateAdapter<any>,
    private _modalService: MatDialog
  ) {
    super();
  }
  openLessonDialog() {
    this._modalService
      .open(AddLessonModalComponent)
      .afterClosed()
      .pipe(first())
      .subscribe((result: CourseLessonModel) => {
        if (result) {
          const lessonObj = this._composeLesson(result);
          if (lessonObj) {
            this.datetimes.push(lessonObj);
            this.datetimes = sortLessons(this.datetimes);
          }
        }
      });
  }
  private _composeLesson(lesson: CourseLessonModel) {
    const date = lesson.date;
    const timeStart = lesson.timeStart;
    const timeFinish = lesson.timeFinish;
    if (date && timeStart && timeFinish) {
      const formattedDate = dateFormatter(new Date(date));
      return {
        ...lesson,
        date: formattedDate,
        timeStart: timeStart,
        timeFinish: timeFinish
      }
    } else return null;
  }
  deleteDate(index: number) {
    this.datetimes.splice(index, 1);
  }
  chooseImage(event: any) {
    if (!event.target.value) return;

    this.formGroup?.patchValue({
      image: event.target.files[0]
    })
  }
}
