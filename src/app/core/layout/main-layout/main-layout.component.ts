import { Component, OnInit } from '@angular/core';
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
import { OrderType } from '../../models/core.model';
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
export class MainLayoutComponent {
  orderType!: number | null;
  constructor(
    private bottomSheet: MatBottomSheet,
    public breakPointService: BreakPointService,
    public cartService: CartService,
    private router: Router,
    private utilService: UtilService,
  ) {
    this.orderType = this.utilService.orderType;
  }

  get isAvatarPage() {
    return this.router.url.includes('avatar');
  }

  get orderTypeTitle() {
    return this.orderType ? `| ${OrderType[this.orderType as number]}` : '';
  }

  onOpenBottomSheet() {
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.utilService.orderType,
    });
  }
}
