import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { UtilService } from '../../../core/services/util.service';
import { OrderDetails } from '../../../orders/models/order.model';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.scss',
})
export class CancelComponent implements OnInit {
  orderDetails!: OrderDetails | null;
  options: AnimationOptions = {
    path: '/cancel.json',
  };

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.orderDetails = this.utilService.getOrderDetails();
    const queryParamSessionID =
      this.route.snapshot.queryParamMap.get('session_id');
    const storedSessionID = localStorage.getItem('session_id');

    if (queryParamSessionID && storedSessionID) {
      if (queryParamSessionID === storedSessionID) {
        this.completeCancelOrder();
        localStorage.removeItem('session_id');
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  completeCancelOrder() {
    this.paymentService
      .payOnline({
        userId: localStorage.getItem('uid') as string,
        isPaid: false,
        isCanceled: false,
        isDelivered: false,
        timeStamp: new Date().getTime(),
        orderType: this.orderDetails?.orderType as number,
        cafeID: this.cartService.cartItems[0].cafeId,
        cafeName: this.cartService.cartItems[0].cafeName,
        tableId: this.orderDetails?.tableId ? this.orderDetails?.tableId : null,
        guest: this.orderDetails?.guest ? this.orderDetails?.guest : null,
        selectedDate: this.orderDetails?.selectedDate
          ? new Date(this.orderDetails?.selectedDate as Date).getTime()
          : null,
        selectedTime: this.orderDetails?.selectedTime
          ? new Date(this.orderDetails?.selectedTime as Date).getTime()
          : null,
        selectedEndTime: this.orderDetails?.selectedEndTime
          ? new Date(this.orderDetails?.selectedEndTime as Date).getTime()
          : null,
        deliveryTime: null,
        deliveredTime: null,
        cartItems:
          this.cartService.cartItems.length >= 1
            ? this.cartService.cartItems
            : [],
        paymentMode: 1, // 1 will be always online
      })
      .subscribe({
        next: (res) => {
          if (res) {
            // this.router.navigate(['/order', res.id]);
            this.cartService.clearCart();
            localStorage.removeItem('orderDetails');
          } else {
            console.log('error');
          }
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log('order canceld!');
        },
      });
  }
}
