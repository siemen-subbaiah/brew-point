import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.scss',
})
export class CancelComponent implements OnInit {
  options: AnimationOptions = {
    path: '/cancel.json',
  };

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
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
        isPaid: false,
        isCanceled: true,
        tableNumber: localStorage.getItem('tableId')
          ? +localStorage.getItem('tableId')!
          : null,
        scheduleDetails: null,
        cartItems: this.cartService.cartItems,
      })
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            // this.router.navigate(['/order', res.id]);
            this.cartService.clearCart();
            localStorage.removeItem('orderType');
          } else {
            console.log('error');
          }
        },
        error: (e) => {
          console.log(e);
          console.log('error');
        },
        complete: () => {
          console.log('order canceld!');
        },
      });
  }
}
