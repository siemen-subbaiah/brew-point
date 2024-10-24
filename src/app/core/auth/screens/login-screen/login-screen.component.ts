import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss',
})
export class LoginScreenComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.loginOrRegister().subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
    });
  }
}
