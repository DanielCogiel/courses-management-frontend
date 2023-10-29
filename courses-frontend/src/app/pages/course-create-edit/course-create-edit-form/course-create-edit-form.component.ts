import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorHandlerForm } from "../../../errors/custom-errors";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DateAdapter } from "@angular/material/core";
import { roles } from "../../../data-access/role/role.enum";
import { levels } from "../../../data-access/level/level.enum";
import { languages } from "../../../data-access/language/language.enum";
import { UserCreateModel } from "../models/user-create-edit.model";

@Component({
  selector: 'app-course-create-edit-form',
  templateUrl: './course-create-edit-form.component.html',
  styleUrls: ['./course-create-edit-form.component.scss']
})
export class CourseCreateEditFormComponent extends ErrorHandlerForm {
  @Input() formGroup?: FormGroup;
  lessonFormGroup = this._fb.group({
    date: [''],
    timeStart: [''],
    timeFinish: ['']
  })
  @Input() datetimes: {date: string, timeStart: string, timeFinish: string} [] = [];
  @Input() users: UserCreateModel [] | null = null;
  readonly levels = levels;
  readonly languages = languages;
  constructor(
    private _fb: FormBuilder,
    private _dateAdapter: DateAdapter<any>
  ) {
    super();
  }
  pushDate() {
    if (!this.lessonFormGroup?.valid)
      return;
    const dateObj = this._composeDateObject();
    if (dateObj) {
      this.datetimes.push(dateObj);
      this.lessonFormGroup.reset();
    }
  }
  private _formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}`
  }
  private _composeDateObject() {
    const date = this.lessonFormGroup?.getRawValue()?.date;
    const timeStart = this.lessonFormGroup?.getRawValue().timeStart;
    const timeFinish = this.lessonFormGroup?.getRawValue().timeFinish;
    if (date && timeStart && timeFinish) {
      const formattedDate = this._formatDate(new Date(date));
      return {
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
