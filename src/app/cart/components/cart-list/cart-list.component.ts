import { Component, Input } from '@angular/core';
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

  constructor(private cartService: CartService) {}

  onAddItem(product: Product) {
    product.quantity++;
    this.cartService.addToCart(product);
  }

  onRemoveItem(product: Product) {
    if (product.quantity > 0) {
      product.quantity--;
      this.cartService.removeFromCart(product.quantity, product);
    }
  }
}
