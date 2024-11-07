import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../cafes/models/cafe.model';
import { CartService } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) isProduct!: boolean;
  @Output() emitRemoveCombo = new EventEmitter<string>();

  constructor(private cartService: CartService) {}

  onAddItem(product: Product, isCombo: boolean) {
    product.quantity++;
    this.cartService.addToCart(product);

    if (isCombo) {
      this.emitRemoveCombo.emit(product.id);
    }
  }

  onRemoveItem(product: Product) {
    if (product.quantity > 0) {
      product.quantity--;
      this.cartService.removeFromCart(product.quantity, product);

      if (product.isCombo) {
        if (product.quantity === 0) {
          this.cartService.addCombo$.next(product);
        }
      }
    }
  }
}
