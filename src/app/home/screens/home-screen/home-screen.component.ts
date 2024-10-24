import { Component } from '@angular/core';
import { CafeService } from '../../../cafes/services/cafe.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent {
  displayName!: string;
  constructor(
    private authService: AuthService,
    private cafeService: CafeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.displayName = this.authService.currentUser.displayName;
    this.listCafes();
  }

  listCafes() {
    this.cafeService.listCafes().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
