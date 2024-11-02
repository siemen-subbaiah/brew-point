import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';
@Component({
  selector: 'app-account-screen',
  standalone: true,
  imports: [MatButtonModule, MatSlideToggleModule, NgOptimizedImage],
  templateUrl: './account-screen.component.html',
  styleUrl: './account-screen.component.scss',
})
export class AccountScreenComponent implements OnInit {
  isDarkTheme!: boolean;
  photoURL!: string;
  authSub = new Subscription();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const darkTheme = localStorage.getItem('dark-theme');

    if (darkTheme) {
      this.isDarkTheme = true;
    } else {
      this.isDarkTheme = false;
    }

    this.authSub = this.authService.user$.subscribe({
      next: (res: User) => {
        if (res) {
          this.photoURL = res?.photoURL ?? '';
        }
      },
    });
  }

  onThemeChange(e: MatSlideToggleChange) {
    if (e.checked) {
      this.isDarkTheme = true;
      localStorage.setItem('dark-theme', JSON.stringify(this.isDarkTheme));
      document.body.classList.add('dark-theme');
    } else {
      this.isDarkTheme = false;
      localStorage.removeItem('dark-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  onLogout() {
    this.cartService.clearCart();
    // here need to clear localstorage!
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
