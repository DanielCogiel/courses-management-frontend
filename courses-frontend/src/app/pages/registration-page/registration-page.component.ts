import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Role from "../../data-access/role/role.enum";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import passwordMatchValidator from "../../validators/password-match.validator";
import { AuthService } from "../../auth/auth.service";
import { Router, RouterLink } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { first } from "rxjs";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CommonModule, RegistrationFormComponent, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  formGroup: FormGroup = this._fb.group({
    username: ['', [Validators.required, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.maxLength(60)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(60), passwordMatchValidator]],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    role: [Role.REGULAR, [Validators.required]]
  }, {updateOn: 'blur'});
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _snackbar: MatSnackBar
    ) {}
  registerUser() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this._auth.register(this.formGroup.value)
        .pipe(first())
        .subscribe({
          next: value => {
            this._snackbar.open(value.body?.message ?? 'Udało się zarejestrować.', 'Zamknij', {
              duration: 5 * 1000
            });
            this._router.navigate(['login']);
          },
          error: error => {
            this._snackbar.open(error?.message ?? 'Rejestracja się nie powiodła.', 'Zamknij', {
              duration: 5 * 1000
            });
          }
        })
    }
  }
}
