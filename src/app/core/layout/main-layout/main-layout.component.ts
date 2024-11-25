import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { BreakPointService } from '../../services/break-point.service';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../cart/services/cart.service';
import { BottomSheetComponent } from '../../components/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilService } from '../../services/util.service';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../../payment/services/payment.service';
import { OrderService } from '../../../orders/services/order.service';
import { OrderType } from '../../models/core.model';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    TopBarComponent,
    BottomBarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  orderSub = new Subscription();
  constructor(
    private bottomSheet: MatBottomSheet,
    public breakPointService: BreakPointService,
    public cartService: CartService,
    private paymentService: PaymentService,
    private router: Router,
    private utilService: UtilService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.listCurrentOrders();
  }

  get isAvatarPage() {
    return this.router.url.includes('avatar');
  }

  get isAccountPage() {
    return this.router.url.includes('account');
  }

  get isCartPage() {
    return this.router.url.includes('cart');
  }

  get isOrderHistroyPage() {
    return this.router.url.includes('order');
  }

  onOpenBottomSheet() {
    const orderDetails = this.utilService.getOrderDetails();

    if (orderDetails === null) {
      this.bottomSheet.open(BottomSheetComponent);
      return;
    }

    this.router.navigate(['/cart']);
  }

  listCurrentOrders() {
    const tolerance = 5 * 60 * 1000; // 5 minutes in milliseconds

    this.orderSub = this.orderService.listCurrentOrders().subscribe({
      next: (res) => {
        if (res.length >= 1) {
          const currentOrders = res;
          console.log(res);

          currentOrders.forEach((order) => {
            if (order.orderType === OrderType['Reserve table']) {
              const selectedTime = order.selectedTime as number;
              const now = Date.now();

              if (now >= selectedTime && now >= selectedTime + tolerance) {
                this.paymentService.updateOrder(order.id as string, 0, now);
              }
            }
          });
        } else {
        }
      },
      error: () => {
        this.utilService.openSnackBar(
          'Something went wrong, please try again later.',
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}
