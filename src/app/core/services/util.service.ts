import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderDetails } from '../../orders/models/order.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private snackBar: MatSnackBar) {}

  getOrderDetails(): OrderDetails | null {
    const storedOrderDetails = localStorage.getItem('orderDetails');
    return storedOrderDetails ? JSON.parse(storedOrderDetails) : null;
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Close', {
      duration: 3000,
    });
  }
}
