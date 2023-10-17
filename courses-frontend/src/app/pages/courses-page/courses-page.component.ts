import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../api/api.service";
import { first } from "rxjs";

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
  constructor(private _api: ApiService) {}
  testApi() {
    this._api
      .post('http://localhost:3000/test/token/verify', undefined, undefined, true)
      .pipe(first()).subscribe(value => console.log(value))
  }
}
