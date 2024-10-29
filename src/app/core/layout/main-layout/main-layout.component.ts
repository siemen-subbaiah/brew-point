import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { BreakPointService } from '../../services/break-point.service';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterLink,
    TopBarComponent,
    BottomBarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  constructor(
    public breakPointService: BreakPointService,
    public cartService: CartService,
    private router: Router
  ) {}

  get isAvatarPage() {
    return this.router.url.includes('avatar');
  }
}
