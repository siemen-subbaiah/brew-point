import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../../cart/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { UtilService } from '../../../core/services/util.service';
import { Order, OrderDetails } from '../../../orders/models/order.model';
import { orderWorker } from '../../../core/utils/data';
import { OrderType } from '../../../core/models/core.model';

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
        timeStamp: Date.now(),
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
        deliveryTime: Math.floor(Math.random() * 5) + 1,
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
            const respData = res as Order;
            if (respData.orderType !== OrderType['Reserve table']) {
              this.router.navigate(['order', 'track', respData.id]);
              orderWorker.postMessage({
                deliveryTime: respData.deliveryTime,
              });
            } else {
              this.router.navigate(['order', 'history', respData.id]);
            }
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
