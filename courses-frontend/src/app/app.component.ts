import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MatSnackBar]
})
export class AppComponent {}
