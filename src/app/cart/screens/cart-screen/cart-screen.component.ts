import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../../core/components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-cart-screen',
  standalone: true,
  imports: [],
  templateUrl: './cart-screen.component.html',
  styleUrl: './cart-screen.component.scss',
})
export class CartScreenComponent implements OnInit {
  orderType!: number | null;

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.orderType = localStorage.getItem('orderType')
      ? Number(localStorage.getItem('orderType'))
      : null;

    if (this.orderType === null) {
      this.bottomSheet.open(BottomSheetComponent, {
        disableClose: true,
        data: this.orderType,
      });
    }
  }
}
