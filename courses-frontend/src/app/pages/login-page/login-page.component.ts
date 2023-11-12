import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorHandlerForm } from "../../errors/custom-errors";
import { AuthService } from "../../auth/auth.service";
import { first } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RoleService } from "../../data-access/role/role.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends ErrorHandlerForm {
  formGroup: FormGroup = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  }, {updateOn: 'blur'});
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _roleService: RoleService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    super();
  }
  login() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this._auth.login(this.formGroup.value)
        .pipe(first())
        .subscribe({
          next: response => {
            this._auth.setAccessToken(response.body?.token);
            this._roleService.setRole(response.body?.role);
            this._router.navigate(['kursy']);
            this._snackbar.open(response.body?.message || 'Witamy!', 'Zamknij', {
              duration: 5 * 1000
            });
          },
          error: error =>  this._snackbar.open(error.error.message || 'Nie udało się zalogować.', 'Zamknij', {
            duration: 5 * 1000
          })
        })
    }
  }
}
