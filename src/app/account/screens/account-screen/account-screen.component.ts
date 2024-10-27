import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account-screen',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './account-screen.component.html',
  styleUrl: './account-screen.component.scss',
})
export class AccountScreenComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
