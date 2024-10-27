import { Injectable, OnDestroy, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakPointService implements OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize!:
    | 'XSmall'
    | 'Small'
    | 'Medium'
    | 'Large'
    | 'XLarge'
    | string;

  // Create a map to display breakpoint names.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  get isDesktopTabScreen() {
    return this.currentScreenSize !== 'XSmall';
  }

  get isMobileScreen() {
    return this.currentScreenSize === 'XSmall';
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
