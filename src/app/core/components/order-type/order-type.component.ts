import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-type',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './order-type.component.html',
  styleUrl: './order-type.component.scss',
})
export class OrderTypeComponent {
  constructor(private router: Router) {}

  onOrderType(type: 0 | 1 | 2) {
    localStorage.setItem('orderType', type.toString());
    this.router.navigate(['cafes'], {
      queryParams: { type },
      queryParamsHandling: 'merge',
    });
  }
}
