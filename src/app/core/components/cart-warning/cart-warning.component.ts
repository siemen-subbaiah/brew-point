import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-warning',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './cart-warning.component.html',
  styleUrl: './cart-warning.component.scss',
})
export class CartWarningComponent {
  constructor(private dialogRef: MatDialogRef<CartWarningComponent>) {}

  onStartFresh() {
    this.dialogRef.close(1);
  }
}
