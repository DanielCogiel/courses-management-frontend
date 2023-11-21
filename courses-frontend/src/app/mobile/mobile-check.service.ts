import { Injectable } from '@angular/core';
import { fromEvent, map, startWith } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MobileCheckService {
  isMobile$ = fromEvent(window, 'resize')
    .pipe(
      startWith(window.innerWidth),
      map(() => window.innerWidth < 1100)
    )
}
