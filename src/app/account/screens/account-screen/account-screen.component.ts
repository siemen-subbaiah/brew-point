import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-account-screen',
  standalone: true,
  imports: [MatButtonModule, MatSlideToggleModule],
  templateUrl: './account-screen.component.html',
  styleUrl: './account-screen.component.scss',
})
export class AccountScreenComponent implements OnInit {
  isDarkTheme!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const darkTheme = localStorage.getItem('dark-theme');
    if (darkTheme) {
      this.isDarkTheme = true;
    } else {
      this.isDarkTheme = false;
    }
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
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
