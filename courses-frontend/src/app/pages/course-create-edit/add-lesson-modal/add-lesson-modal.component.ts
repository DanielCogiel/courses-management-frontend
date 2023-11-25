import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CourseLessonModel } from "../../course-details-page/course-lessons/course-lesson.model";
import { ErrorHandlerForm } from "../../../errors/custom-errors";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-lesson-modal',
  templateUrl: './add-lesson-modal.component.html',
  styleUrls: ['./add-lesson-modal.component.scss'],
  providers: [MatSnackBar]
})
export class AddLessonModalComponent extends ErrorHandlerForm {
  formGroup = this._fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(1000)]],
    date: ['', [Validators.required]],
    timeStart: ['', [Validators.required]],
    timeFinish: ['', [Validators.required]]
  })
  constructor(
    public dialogRef: MatDialogRef<AddLessonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseLessonModel,
    private _fb: FormBuilder,
    private _snackbar: MatSnackBar
  ) {
    super();
    if (data)
      this.formGroup.patchValue(data);
  }
  cancel() {
    this.dialogRef.close();
  }
  submit() {
    if (this.formGroup.valid) {
      const [startHours, startMinutes] = this.formGroup.value.timeStart!.split(':').map((str: string) => parseInt(str));
      const [finishHours, finishMinutes] = this.formGroup.value.timeFinish!.split(':').map((str: string) => parseInt(str));

      if (startHours < finishHours)
        this.dialogRef.close(this.formGroup.getRawValue());
      else if (startHours === finishHours) {
        if (startMinutes < finishMinutes)
          this.dialogRef.close(this.formGroup.getRawValue());
        else
          this._snackbar.open('Godzina zakończenia powinna być późniejsza niż godzina rozpoczęcia.', 'Zamknij', {
            duration: 5 * 1000,
          })
      } else
        this._snackbar.open('Godzina zakończenia powinna być późniejsza niż godzina rozpoczęcia.', 'Zamknij', {
          duration: 5 * 1000
        })
    }
  }
}
