import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import Role, { roles } from "../../../data-access/role/role.enum";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-admin-page-filters',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatButtonModule],
  templateUrl: './admin-page-filters.component.html',
  styles: [`
    .button-container {
      padding: 0 12px;
      button {
        width: 100%;
        height: 56px !important;
      }
    }
  `]
})
export class AdminPageFiltersComponent {
  formGroup: FormGroup = this._fb.group({
    username: [null],
    role: [null]
  });
  @Output() onFilterApplied: EventEmitter<{ username: string | null, role: Role | null }> = new EventEmitter<{username: string | null; role: Role | null}>();
  readonly roles = roles;
  constructor(private _fb: FormBuilder) {}
  applyFilters() {
    this.onFilterApplied.emit(this.formGroup.getRawValue());
  }
  clear() {
    this.formGroup.reset();
    this.applyFilters();
  }
}
