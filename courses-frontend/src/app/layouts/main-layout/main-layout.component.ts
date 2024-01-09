import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from "@angular/router";
import { HeaderModule } from "../../components/header/header.module";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderModule],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  constructor(private _router: Router) {
    if (this._router.url === '/')
      this._router.navigate(['kursy']);
  }
}
