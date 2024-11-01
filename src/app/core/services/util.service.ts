import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private snackBar: MatSnackBar) {}

  getOrderType(): number | null {
    const storedOrderType = localStorage.getItem('orderType');
    return storedOrderType ? Number(storedOrderType) : null;
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Close', {
      duration: 3000,
    });
  }
}
