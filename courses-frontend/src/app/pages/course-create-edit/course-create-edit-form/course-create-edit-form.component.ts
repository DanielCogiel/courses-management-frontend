import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ErrorHandlerForm } from "../../../errors/custom-errors";
import { DateAdapter } from "@angular/material/core";
import { levels } from "../../../data-access/level/level.enum";
import { languages } from "../../../data-access/language/language.enum";
import { UserCreateModel } from "../models/user-create-edit.model";
import { MatDialog } from "@angular/material/dialog";
import { AddLessonModalComponent } from "../add-lesson-modal/add-lesson-modal.component";
import { first } from "rxjs";
import { CourseLessonModel } from "../../course-details-page/course-lessons/course-lesson.model";
import { dateFormatter } from "../../../utility/date-formatter.function";
import { sortLessons } from "../../../utility/sort-lessons.function";
import { parseDateTimeStrings } from "../../../utility/parse-string-to-string.function";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CourseCreateEditService } from "../course-create-edit.service";

@Component({
  selector: 'app-course-create-edit-form',
  templateUrl: './course-create-edit-form.component.html',
  styleUrls: ['./course-create-edit-form.component.scss']
})
export class CourseCreateEditFormComponent extends ErrorHandlerForm {
  @Input() formGroup?: FormGroup;
  @Input() lessons: {title: string | null, description: string | null, date: string, timeStart: string, timeFinish: string} [] = [];
  @Input() users: UserCreateModel [] | null = null;
  readonly levels = levels;
  readonly languages = languages;
  constructor(
    private _fb: FormBuilder,
    private _dateAdapter: DateAdapter<any>,
    private _modalService: MatDialog,
    private _snackbar: MatSnackBar,
    private _coursesService: CourseCreateEditService
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
            let tempLessons = [...this.lessons];
            tempLessons.push(lessonObj);
            tempLessons = sortLessons(tempLessons);
            const validation = this._validateLessonOverlapping(tempLessons as CourseLessonModel[], lessonObj);

            if (validation.valid) {
              this.lessons.push(lessonObj);
              this._sortLessons();
              this._coursesService.lessonsDirty$.next(true);
            } else {
              this._snackbar.open(`Czas podanej lekcji nakłada się z lekcją ${validation.overlapObj?.title}.`, 'Zamknij', {
                duration: 5 * 1000
              })
            }
          }
        }
      });
  }
  private _sortLessons() {
    this.lessons.sort((lessonA, lessonB) => {
      return parseDateTimeStrings(lessonA.date, lessonA.timeStart).getTime() - parseDateTimeStrings(lessonB.date, lessonB.timeStart).getTime();
    })
  }
  private _validateLessonOverlapping(lessons: CourseLessonModel [], checkedLesson: CourseLessonModel) {
    let validationObj: {
      valid: boolean,
      overlapObj: CourseLessonModel | null
    } = {
      valid: true,
      overlapObj: null
    };
    for (let i = 0; i < lessons.length - 1; i++) {
      const currentLessonDatetime = parseDateTimeStrings(
        lessons[i].date, lessons[i].timeFinish
      );
      const nextLessonDatetime = parseDateTimeStrings(
        lessons[i + 1].date, lessons[i + 1].timeStart)
      if (currentLessonDatetime.getTime() > nextLessonDatetime.getTime()) {
        validationObj.valid = false;
        if (lessons[i] === checkedLesson)
          validationObj.overlapObj = lessons[i + 1] as CourseLessonModel;
        else
          validationObj.overlapObj = lessons[i] as CourseLessonModel;
        break;
      }
    }
    return validationObj;
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
  deleteLesson(index: number) {
    this.lessons.splice(index, 1);
    this._coursesService.lessonsDirty$.next(true);
  }
  editLesson(index: number) {
    this._modalService
      .open(AddLessonModalComponent, {
        data: this.lessons[index]
      })
      .afterClosed()
      .pipe(first())
      .subscribe((result: CourseLessonModel) => {
        if (result) {
          const lessonObj = this._composeLesson(result);
          if (lessonObj) {
            let tempLessons = [...this.lessons];
            tempLessons[index] = lessonObj;
            tempLessons = sortLessons(tempLessons);
            const validation = this._validateLessonOverlapping(tempLessons as CourseLessonModel[], lessonObj);

            if (validation.valid) {
              this.lessons[index] = lessonObj;
              this._coursesService.lessonsDirty$.next(true);
            } else {
              this._snackbar.open(`Czas podanej lekcji nakłada się z lekcją ${validation.overlapObj?.title}.`, 'Zamknij', {
                duration: 5 * 1000
              })
            }
          }
        }
      });
  }
  chooseImage(event: any) {
    if (!event.target.value) return;

    this.formGroup?.patchValue({
      image: event.target.files[0]
    })
  }
}
