import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { UserButtonComponent } from './user-button/user-button.component';
import { TimerComponent } from './timer/timer.component';
import { TimePipe } from "../../data-access/timer/time.pipe";
import { HasRolesDirective } from "../../data-access/role/has-roles.directive";
import { RouterLink } from "@angular/router";
import { MatTooltipModule } from "@angular/material/tooltip";
@NgModule({
  declarations: [HeaderComponent, UserButtonComponent, TimerComponent],
  exports: [HeaderComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        TimePipe,
        HasRolesDirective,
        RouterLink,
        MatTooltipModule
    ]
})
export class HeaderModule { }
