import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-lesson-modal',
  templateUrl: './add-lesson-modal.component.html',
  styleUrls: ['./add-lesson-modal.component.scss']
})
export class AddLessonModalComponent {
  formGroup = this._fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(1000)]],
    date: [''],
    timeStart: [''],
    timeFinish: ['']
  })
  constructor(
    public dialogRef: MatDialogRef<AddLessonModalComponent>,
    private _fb: FormBuilder
  ) {}
  cancel() {
    this.dialogRef.close();
  }
  submit() {
    if (this.formGroup.valid)
      this.dialogRef.close(this.formGroup.getRawValue());
  }
}
