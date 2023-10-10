import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Role, { roles } from "../../auth/models/role.enum";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CommonModule, RegistrationFormComponent, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  formGroup: FormGroup = this._fb.group({
    username: ['', [Validators.required, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.maxLength(60)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(60)]],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    role: [Role.REGULAR, [Validators.required]]
  });
  constructor(private _fb: FormBuilder) {}

  registerUser() {
    console.log(this.formGroup.value)
  }
}
