import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import Role from "../../../data-access/role/role.enum";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { Level, levels } from "../../../data-access/level/level.enum";
import { Language, languages } from "../../../data-access/language/language.enum";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
export interface CoursesFiltersModel {
  title: string,
  level?: Level,
  language?: Language,
  dateStart?: string,
  dateFinish?: string,
  status?: 'active' | 'finished'
}
@Component({
  selector: 'app-courses-filters',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatCheckboxModule, MatTooltipModule, MatIconModule],
  templateUrl: './courses-filters.component.html',
  styleUrls: ['./courses-filters.component.scss']
})
export class CoursesFiltersComponent {
  formGroup: FormGroup = this._fb.group({
    title: [''],
    level: [undefined],
    language: [undefined],
    dateStart: [undefined],
    dateFinish: [undefined],
    status: [undefined]
  });
  readonly levels = levels;
  readonly languages = languages;
  @Output() onFilterApplied: EventEmitter<CoursesFiltersModel> = new EventEmitter<CoursesFiltersModel>();
  constructor(private _fb: FormBuilder) {}
  applyFilters() {
    this.onFilterApplied.emit(this.formGroup.getRawValue());
  }
  clear() {
    this.formGroup.reset();
    this.applyFilters();
  }
  clearField(field: string) {
    this.formGroup.get(field)?.reset();
  }
}
