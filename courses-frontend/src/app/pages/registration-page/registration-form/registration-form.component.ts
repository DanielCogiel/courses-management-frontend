import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import Role, { roles } from "../../../data-access/role/role.enum";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ErrorHandlerForm } from "../../../errors/custom-errors";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent extends ErrorHandlerForm {
  @Input() formGroup?: FormGroup;
  readonly roles = roles
    .filter(role => role.role !== Role.ADMIN);
}
