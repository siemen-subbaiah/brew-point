import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../../cart/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { UtilService } from '../../../core/services/util.service';
import { OrderDetails } from '../../../orders/models/order.model';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  orderDetails!: OrderDetails | null;
  options: AnimationOptions = {
    path: '/success.json',
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
        this.completeSuccessOrder();
        localStorage.removeItem('session_id');
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  completeSuccessOrder() {
    this.paymentService
      .payOnline({
        userId: localStorage.getItem('uid') as string,
        isPaid: true,
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
        cartItems:
          this.cartService.cartItems.length >= 1
            ? this.cartService.cartItems
            : [],
      })
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            this.router.navigate(['/order', res.id]);
            this.cartService.clearCart();
            localStorage.removeItem('orderDetails');
          } else {
            console.log('error');
          }
        },
        error: (e) => {
          console.log(e);
          console.log('error');
        },
        complete: () => {
          console.log('order placed!');
        },
      });
  }
}
