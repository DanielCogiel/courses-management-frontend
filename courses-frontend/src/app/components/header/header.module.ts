import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { UserButtonComponent } from './user-button/user-button.component';
@NgModule({
  declarations: [HeaderComponent, UserButtonComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HeaderModule { }
