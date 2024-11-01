import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-screen',
  standalone: true,
  imports: [],
  templateUrl: './order-screen.component.html',
  styleUrl: './order-screen.component.scss',
})
export class OrderScreenComponent implements OnInit, OnDestroy {
  orderId!: string;
  orderSub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getOrder(this.orderId);
  }

  getOrder(orderId: string) {
    this.orderService.getOrderById(orderId).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
        } else {
          this.router.navigate(['/']);
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }
}
