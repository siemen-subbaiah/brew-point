import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';
import { OrderService } from '../../../orders/services/order.service';
import { Order } from '../../../orders/models/order.model';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';
import { OrderListComponent } from '../../../home/components/order-list/order-list.component';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { UtilService } from '../../../core/services/util.service';
import { BreakPointService } from '../../../core/services/break-point.service';

@Component({
  selector: 'app-account-screen',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    SpinnerComponent,
    OrderListComponent,
  ],
  templateUrl: './account-screen.component.html',
  styleUrl: './account-screen.component.scss',
})
export class AccountScreenComponent implements OnInit {
  currentOrders: { type: number; title: string; children: Order[] }[] = [];
  deliveredOrders: { type: number; title: string; children: Order[] }[] = [];
  isDarkTheme!: boolean;
  loading!: boolean;
  photoURL!: string;
  displayName!: string;
  email!: string;
  authSub = new Subscription();
  orderSub1 = new Subscription();
  orderSub2 = new Subscription();

  constructor(
    private authService: AuthService,
    public breakPointService: BreakPointService,
    private cartService: CartService,
    private utilService: UtilService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const darkTheme = localStorage.getItem('dark-theme');

    if (darkTheme) {
      this.isDarkTheme = true;
    } else {
      this.isDarkTheme = false;
    }

    this.authSub = this.authService.user$.subscribe({
      next: (res: User) => {
        if (res) {
          this.displayName = res?.displayName ?? '';
          this.email = res?.email ?? '';
          this.photoURL = res?.photoURL ?? '';
        }
      },
    });

    this.listCurrentOrders();
    this.listAllOrders();
  }

  onThemeChange(e: MatButtonToggleChange) {
    if (e.value === 'dark') {
      this.isDarkTheme = true;
      localStorage.setItem('dark-theme', JSON.stringify(this.isDarkTheme));
      document.body.classList.add('dark-theme');
    } else {
      this.isDarkTheme = false;
      localStorage.removeItem('dark-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  listCurrentOrders() {
    this.loading = true;
    this.orderSub1 = this.orderService.listCurrentOrders().subscribe({
      next: (res) => {
        if (res.length >= 1) {
          const orders = res;
          const orderTitles = [
            { type: 0, title: 'Upcoming schedule' },
            { type: 1, title: 'Upcoming pickup' },
            { type: 2, title: 'Upcoming serve' },
          ];
          this.currentOrders = orderTitles.map((orderTitle) => {
            return {
              type: orderTitle.type,
              title: orderTitle.title,
              children: orders
                .filter((order) => order.orderType === orderTitle.type)
                .sort((a, b) => b.timeStamp - a.timeStamp),
            };
          });
        } else {
          this.currentOrders = [];
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.utilService.openSnackBar(
          'Something went wrong, please try again later.',
        );
      },
    });
  }

  listAllOrders() {
    this.loading = true;
    this.orderSub2 = this.orderService.listAllOrders().subscribe({
      next: (res) => {
        if (res.length >= 1) {
          const orders = res;
          const orderTitles = [
            { type: 0, title: 'Upcoming schedule' },
            { type: 1, title: 'Upcoming pickup' },
            { type: 2, title: 'Upcoming serve' },
          ];
          this.deliveredOrders = orderTitles.map((orderTitle) => {
            return {
              type: orderTitle.type,
              title: orderTitle.title,
              children: orders
                .filter((order) => order.orderType === orderTitle.type)
                .sort((a, b) => b.timeStamp - a.timeStamp),
            };
          });
        } else {
          this.deliveredOrders = [];
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.utilService.openSnackBar(
          'Something went wrong, please try again later.',
        );
      },
    });
  }

  get isDeliveredOrdersEmpty() {
    return this.deliveredOrders.every((item) => item.children.length === 0);
  }

  get isCurrentOrdersEmpty() {
    return this.currentOrders.every((item) => item.children.length === 0);
  }

  onLogout() {
    this.cartService.clearCart();
    localStorage.clear();
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }

    if (this.orderSub1) {
      this.orderSub1.unsubscribe();
    }

    if (this.orderSub2) {
      this.orderSub2.unsubscribe();
    }
  }
}
