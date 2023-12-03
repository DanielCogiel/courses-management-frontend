import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorHandlerForm } from "../../../errors/custom-errors";
import passwordMatchValidator from "../../../validators/password-match.validator";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  PasswordStrengthCheckerComponent
} from "../../../components/password-strength-checker/password-strength-checker.component";

@Component({
  selector: 'app-password-change-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, PasswordStrengthCheckerComponent],
  templateUrl: './password-change-modal.component.html',
  styles: [`
    form {
      width: 550px;
    }
  `]
})
export class PasswordChangeModalComponent extends ErrorHandlerForm {
  @Input() context: 'mine' | 'user' = 'user';
  formGroup: FormGroup = this._fb.group({
    password: ['', [Validators.required, Validators.maxLength(60)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(60), passwordMatchValidator]],
  }, {updateOn: 'blur'});
  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<PasswordChangeModalComponent>
  ) {
    super();
  }
  cancel() {
    this.dialogRef.close();
  }
  changePassword() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid)
      this.dialogRef.close(this.formGroup.getRawValue());
  }
}
