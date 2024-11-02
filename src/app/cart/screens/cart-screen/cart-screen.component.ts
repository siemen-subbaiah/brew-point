import { Component, isDevMode, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../../core/components/bottom-sheet/bottom-sheet.component';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilService } from '../../../core/services/util.service';
import { OrderType, TableType } from '../../../core/models/core.model';
import { Router } from '@angular/router';
import { PaymentService } from '../../../payment/services/payment.service';
import { MatCardModule } from '@angular/material/card';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProductListComponent } from '../../../cafes/components/product-list/product-list.component';

@Component({
  selector: 'app-cart-screen',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatHint,
    MatIconModule,
    ProductListComponent,
  ],
  templateUrl: './cart-screen.component.html',
  styleUrl: './cart-screen.component.scss',
})
export class CartScreenComponent implements OnInit {
  orderType!: number | null;
  tableId!: number | null;
  paymentMethod!: number;
  payLoading!: boolean;
  testCardNumber = '4000 0035 6000 0008';
  constructor(
    private bottomSheet: MatBottomSheet,
    public cartService: CartService,
    private clipboard: Clipboard,
    private paymentService: PaymentService,
    private router: Router,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.orderType = this.utilService.getOrderType();
    this.tableId = this.utilService.getTableId();
    if (this.orderType === null && this.cartService.cartItems.length > 0) {
      this.bottomSheet.open(BottomSheetComponent, {
        disableClose: true,
        data: this.orderType,
      });
    }
  }

  get cartItemsWithCopies() {
    return this.cartService.cartItems.map((product) => ({ ...product }));
  }

  get orderTypeTitle() {
    return this.orderType !== null ? OrderType[this.orderType as number] : '';
  }

  get tableType() {
    return this.tableId !== null ? TableType[this.tableId as number] : '';
  }

  copyCardNumber() {
    this.clipboard.copy(this.testCardNumber);
    this.utilService.openSnackBar(`Copied card number to clipboard`);
  }

  onSelectPaymentMethod(e: MatRadioChange) {
    this.paymentMethod = +e.value;
  }

  onPlaceOrder() {
    if (this.paymentMethod === 1) {
      this.onPayOnline();
    } else {
      this.onPayCounter();
    }
  }

  onCancelOrder() {
    this.router.navigate(['/']);
  }

  onPayOnline() {
    this.payLoading = true;
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
          this.payLoading = false;
          console.log(e);
        },
        complete: () => {
          this.payLoading = false;
        },
      });
  }

  onPayCounter() {
    this.payLoading = true;
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
          this.payLoading = false;
          console.log('error');
        },
        complete: () => {
          this.payLoading = false;
          console.log('order placed!');
        },
      });
  }

  onClearCart() {
    this.cartService.clearCart();
    localStorage.removeItem('orderType');
    localStorage.removeItem('tableId');
    this.orderType = null;
  }
}
