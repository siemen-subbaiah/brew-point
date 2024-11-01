import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { BreakPointService } from '../../services/break-point.service';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../cart/services/cart.service';
import { BottomSheetComponent } from '../../components/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilService } from '../../services/util.service';
import { OrderService } from '../../../orders/services/order.service';
import { Order } from '../../../orders/models/order.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterLink,
    TopBarComponent,
    BottomBarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  orderType!: number | null;
  currentOrder: Order[] = [];
  currentOrderId!: string;
  orderSub = new Subscription();
  constructor(
    private bottomSheet: MatBottomSheet,
    public breakPointService: BreakPointService,
    public cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private utilService: UtilService,
  ) {}

  ngOnInit() {
    this.listCurrentOrders();
  }

  get isAvatarPage() {
    return this.router.url.includes('avatar');
  }

  get isCartPage() {
    return this.router.url.includes('cart');
  }

  listCurrentOrders() {
    this.orderSub = this.orderService.listCurrentOrder().subscribe({
      next: (res) => {
        this.currentOrder = res;
        if (this.currentOrder.length >= 1) {
          this.currentOrderId = this.currentOrder[0].id as string;
          this.orderService.currentOrder$.next(true);
        } else {
          this.orderService.currentOrder$.next(false);
        }
      },
    });
  }

  onOpenBottomSheet() {
    this.orderType = this.utilService.getOrderType();
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.orderType,
    });
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}
