import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  currentUser!: User | null;
  authSub = new Subscription();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe({
      next: (res: User) => {
        if (res) {
          this.currentUser = res;
        } else {
          this.currentUser = null;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
