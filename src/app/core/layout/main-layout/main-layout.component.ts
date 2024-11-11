import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { BreakPointService } from '../../services/break-point.service';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../cart/services/cart.service';
import { BottomSheetComponent } from '../../components/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilService } from '../../services/util.service';
import { Subscription } from 'rxjs';
import { testWorker } from '../../utils/data';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
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
  orderSub = new Subscription();
  constructor(
    private bottomSheet: MatBottomSheet,
    public breakPointService: BreakPointService,
    public cartService: CartService,
    private router: Router,
    private utilService: UtilService,
  ) {}

  ngOnInit() {}

  get isAvatarPage() {
    return this.router.url.includes('avatar');
  }

  get isCartPage() {
    return this.router.url.includes('cart');
  }

  onOpenBottomSheet() {
    const orderDetails = this.utilService.getOrderDetails();

    if (orderDetails === null) {
      this.bottomSheet.open(BottomSheetComponent);
      return;
    }

    this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}
