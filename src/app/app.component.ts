import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthService } from './core/auth/services/auth.service';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { LoginScreenComponent } from './core/auth/screens/login-screen/login-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, LoginScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  authSub = new Subscription();
  userLoggedIn!: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe({
      next: (res: User) => {
        if (res) {
          console.log(res);
          this.userLoggedIn = true;
          this.authService.currentUser = {
            email: res?.email!,
            displayName: res?.displayName!,
          };
          localStorage.setItem('uid', res?.uid);
        } else {
          this.userLoggedIn = false;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
