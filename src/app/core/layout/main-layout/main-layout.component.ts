import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { BreakPointService } from '../../services/break-point.service';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, TopBarComponent, BottomBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  constructor(
    private breakPointService: BreakPointService,
    private router: Router
  ) {}

  get isAvatarPage() {
    return this.router.url.includes('avatar');
  }

  get isDesktopTabScreen() {
    return this.breakPointService.currentScreenSize !== 'XSmall';
  }

  get isMobileScreen() {
    return this.breakPointService.currentScreenSize === 'XSmall';
  }
}
