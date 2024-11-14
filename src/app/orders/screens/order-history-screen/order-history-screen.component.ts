import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from '../../../core/services/util.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { MatCardModule } from '@angular/material/card';
import { OrderType, TableType } from '../../../core/models/core.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import dayjs from 'dayjs';
import { MatDividerModule } from '@angular/material/divider';
import { CartListComponent } from '../../../cart/components/cart-list/cart-list.component';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';

@Component({
  selector: 'app-order-history-screen',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    CartListComponent,
    SpinnerComponent,
  ],
  templateUrl: './order-history-screen.component.html',
  styleUrl: './order-history-screen.component.scss',
})
export class OrderHistoryScreenComponent implements OnInit, OnDestroy {
  orderId!: string;
  order!: Order;
  loading!: boolean;
  orderSub = new Subscription();

  constructor(
    private orderService: OrderService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getOrder(this.orderId);
  }

  getOrder(orderId: string) {
    this.loading = true;
    this.orderSub = this.orderService.getOrderById(orderId).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);

          this.order = res;
        } else {
          this.router.navigate(['/']);
          this.utilService.openSnackBar('Order not found');
        }
      },
      error: (err) => {
        this.router.navigate(['/']);
        this.utilService.openSnackBar('Something went wrong');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  get determineOrderType() {
    return OrderType[this.order.orderType as number];
  }

  get determineDeliveredText() {
    switch (this.order.orderType) {
      case OrderType['Book at Table']:
        return 'Served At:';
      case OrderType['Schedule Pickup']:
        return 'Picked up At:';
      case OrderType['Reserve table']:
        return 'Arrived At (EST):';
      default:
        return '';
    }
  }

  get determineDeliveredValue() {
    switch (this.order.orderType) {
      case OrderType['Book at Table']:
        return dayjs(this.order?.deliveredTime).format('DD MMM YYYY, hh:mm A');
      case OrderType['Schedule Pickup']:
        return dayjs(this.order?.deliveredTime).format('DD MMM YYYY, hh:mm A');
      case OrderType['Reserve table']:
        return `${dayjs(this.order?.selectedDate).format(
          'DD MMM, YYYY',
        )}, ${dayjs(this.order?.selectedTime).format('hh:mm A')}`;
      default:
        return '';
    }
  }

  get determineOrderDetails() {
    switch (this.order.orderType) {
      case OrderType['Book at Table']:
        return TableType[this.order.tableId as number];
      case OrderType['Schedule Pickup']: {
        const formattedDate = dayjs(this.order?.selectedDate).format(
          'DD MMM, YYYY',
        );
        const formattedStartTime = dayjs(this.order?.selectedTime).format(
          'hh:mm A',
        );
        return `${formattedDate}, ${formattedStartTime}`;
      }
      case OrderType['Reserve table']: {
        const formattedDate = dayjs(this.order?.selectedDate).format(
          'DD MMM, YYYY',
        );
        const formattedStartTime = dayjs(this.order?.selectedTime).format(
          'hh:mm A',
        );
        const formattedEndTime = dayjs(this.order?.selectedEndTime).format(
          'hh:mm A',
        );
        return `${formattedDate}, ${formattedStartTime} - ${formattedEndTime}`;
      }

      default:
        return '';
    }
  }

  get isReserveTable() {
    return this.order.orderType === OrderType['Reserve table'];
  }

  get cartTo1tal() {
    return this.order.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }
}
