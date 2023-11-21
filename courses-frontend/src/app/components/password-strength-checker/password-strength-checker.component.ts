import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-password-strength-checker',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './password-strength-checker.component.html',
  styleUrls: ['./password-strength-checker.component.scss']
})
export class PasswordStrengthCheckerComponent {
  @Input() formGroup?: FormGroup;
  @Input() passwordFieldName: string = 'password';
  get password() {
    return this.formGroup?.getRawValue()[this.passwordFieldName];
  }
  isLengthCorrect() {
    return this.password?.length >= 8;
  }
  hasSpecialSign() {
    const specialSignRegex: RegExp = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
    return specialSignRegex.test(this.password);
  }
  hasBigLetter() {
    const bigLetterRegex: RegExp = /^(?=.*[A-Z]).*$/;
    return bigLetterRegex.test(this.password);
  }
  hasDigit() {
    const digitRegex: RegExp = /^(?=.*\d).*$/;
    return digitRegex.test(this.password);
  }
}
