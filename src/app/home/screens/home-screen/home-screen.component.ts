import { Component, OnDestroy, OnInit } from '@angular/core';
import { CafeService } from '../../../cafes/services/cafe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CafeListComponent } from '../../components/cafe-list/cafe-list.component';
import { Cafe } from '../../../cafes/models/cafe.model';
import { Subscription } from 'rxjs';
import { BreakPointService } from '../../../core/services/break-point.service';
import { SearchComponent } from '../../../core/components/search/search.component';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';
import { OrderService } from '../../../orders/services/order.service';
import { Order } from '../../../orders/models/order.model';
import { OrderListComponent } from '../../components/order-list/order-list.component';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    CafeListComponent,
    SearchComponent,
    OrderListComponent,
    SpinnerComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  cafes!: Cafe[];
  currentOrder: Order[] = [];
  currentRecentOrders: { type: number; title: string; children: Order }[] = [];
  loading!: boolean;
  currentOrderLoading!: boolean;
  options: { id: string; name: string }[] = [];
  cafeSub = new Subscription();
  orderSub = new Subscription();

  constructor(
    public breakPointService: BreakPointService,
    private cafeService: CafeService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.listPopularCafes();
    this.listCurrentOrders();
  }

  listPopularCafes() {
    this.loading = true;
    this.cafeSub = this.cafeService.listPopularCafes().subscribe({
      next: (res) => {
        this.cafes = res;
        this.options = res.map((cafe) => ({ id: cafe.id, name: cafe.name }));
        this.cafeService.allCafes$.next(
          res.map((cafe) => ({ id: cafe.id, name: cafe.name })),
        );
        this.loading = false;
      },
    });
  }

  listCurrentOrders() {
    this.currentOrderLoading = true;
    this.orderSub = this.orderService.listCurrentOrders().subscribe({
      next: (res) => {
        if (res.length >= 1) {
          this.currentOrder = res;
          const orderTitles = [
            { type: 0, title: 'Upcoming schedule' },
            { type: 1, title: 'Upcoming pickup' },
            { type: 2, title: 'Upcoming serve' },
          ];
          this.currentRecentOrders = orderTitles.map((order) => {
            return {
              type: order.type,
              title: order.title,
              children: this.currentOrder
                .filter((currentOrder) => currentOrder.orderType === order.type)
                .sort((a, b) => b.timeStamp - a.timeStamp)[0],
            };
          });

          console.log(this.currentRecentOrders);
        } else {
          this.currentOrder = [];
        }
        this.currentOrderLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.cafeSub) {
      this.cafeSub.unsubscribe();
    }

    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }
}
