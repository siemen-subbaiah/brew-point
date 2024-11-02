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

  getTableId(): number | null {
    const storedTableId = localStorage.getItem('tableId');
    return storedTableId ? Number(storedTableId) : null;
  }

  openSnackBar(content: string) {
    this.snackBar.open(content, 'Close', {
      duration: 3000,
    });
  }
}
