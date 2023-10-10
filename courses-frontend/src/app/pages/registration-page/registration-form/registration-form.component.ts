import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { roles } from "../../../auth/models/role.enum";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  @Input() formGroup?: FormGroup;
  readonly roles = roles;
}
