import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../../cart/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  options: AnimationOptions = {
    path: '/success.json',
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
        isPaid: true,
        isCanceled: false,
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
            this.router.navigate(['/order', res.id]);
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
          console.log('order placed!');
        },
      });
  }
}
