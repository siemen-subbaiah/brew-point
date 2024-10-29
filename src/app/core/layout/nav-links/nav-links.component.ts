import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navLinks } from '../../utils/data';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss',
})
export class NavLinksComponent {
  navLinks = navLinks;
  constructor(public cartService: CartService) {}
}
