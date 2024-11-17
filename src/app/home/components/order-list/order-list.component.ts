import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from '../../../orders/models/order.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderListDetailsComponent } from '../order-list-details/order-list-details.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    RouterLink,
    OrderListDetailsComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnChanges {
  @Input({ required: true }) details!: {
    type: number;
    title: string;
    children: Order | Order[];
  };
  @Input({ required: true }) isHome!: boolean;
  @Input({ required: true }) currentOrder!: boolean;
  orderDetailsArray: Order[] = this.details?.children as Order[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['details']) {
      this.orderDetailsArray = Array.isArray(this.details.children)
        ? this.details.children
        : [this.details.children];
    }
  }
}
