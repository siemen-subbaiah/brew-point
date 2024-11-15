import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navLinks } from '../../utils/data';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../../cart/services/cart.service';
import { UtilService } from '../../services/util.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '@angular/fire/auth';

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
export class NavLinksComponent implements OnInit, OnDestroy {
  navLinks = navLinks;
  photoURL!: string;
  photoURLSub = new Subscription();

  constructor(
    private authService: AuthService,
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.photoURLSub = this.authService.profileChanged$.subscribe((res) => {
      if (res) {
        this.photoURL = res ?? '';
      }
    });

    this.photoURL = localStorage.getItem('photoURL') ?? '';
  }

  ngOnDestroy(): void {
    this.photoURLSub.unsubscribe();
  }
}
