import { Component, isDevMode, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../../core/components/bottom-sheet/bottom-sheet.component';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilService } from '../../../core/services/util.service';
import { OrderType } from '../../../core/models/core.model';
import { Router } from '@angular/router';
import { PaymentService } from '../../../payment/services/payment.service';

@Component({
  selector: 'app-cart-screen',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './cart-screen.component.html',
  styleUrl: './cart-screen.component.scss',
})
export class CartScreenComponent implements OnInit {
  orderType!: number | null;
  payOnlineLoading!: boolean;
  payCounterLoading!: boolean;
  constructor(
    private bottomSheet: MatBottomSheet,
    public cartService: CartService,
    private paymentService: PaymentService,
    private router: Router,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.orderType = this.utilService.getOrderType();
    if (this.orderType === null && this.cartService.cartItems.length > 0) {
      this.bottomSheet.open(BottomSheetComponent, {
        disableClose: true,
        data: this.orderType,
      });
    }
  }

  get orderTypeTitle() {
    return this.orderType !== null ? OrderType[this.orderType as number] : '';
  }

  onPayOnline() {
    this.payOnlineLoading = true;
    this.paymentService
      .stripeCheckout({
        products: this.cartService.cartItems,
        isDev: isDevMode(),
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            alert(res.error.message);
          }
        },
        error: (e) => {
          this.payOnlineLoading = false;
          console.log(e);
        },
        complete: () => {
          this.payOnlineLoading = false;
        },
      });
  }

  onPayCounter() {
    this.payCounterLoading = true;
    this.paymentService
      .payCounter({
        isPaid: true,
        isCanceled: false,
        tableNumber: null,
        scheduleDetails: null,
        cartItems: this.cartService.cartItems,
      })
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            this.router.navigate(['/order', res.id]);
            this.onClearCart();
          } else {
            console.log('error');
          }
        },
        error: (e) => {
          console.log(e);
          this.payCounterLoading = false;
          console.log('error');
        },
        complete: () => {
          this.payCounterLoading = false;
          console.log('order placed!');
        },
      });
  }

  onClearCart() {
    this.cartService.clearCart();
    localStorage.removeItem('orderType');
  }
}
