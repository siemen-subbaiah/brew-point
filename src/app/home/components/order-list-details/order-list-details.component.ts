import { Component, Input } from '@angular/core';
import { Order } from '../../../orders/models/order.model';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-list-details',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './order-list-details.component.html',
  styleUrl: './order-list-details.component.scss',
})
export class OrderListDetailsComponent {
  @Input({ required: true }) order!: Order;
  @Input() currentOrder!: boolean;

  get determineOrderURL() {
    return this.currentOrder
      ? ['/order', 'track', this.order.id]
      : ['/order', 'history', this.order.id];
  }
}
