import { Component } from '@angular/core';
import { TimeService } from "../../../data-access/timer/time.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  time$ = this._timeService.timer$;
  constructor(private _timeService: TimeService) {}
}
