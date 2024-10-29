import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/cafe.model';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    TruncatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  isAllowedToCart = true;
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) cafeId!: string;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    const cartItems = JSON.parse(
      localStorage.getItem('cartItems')!
    ) as Product[];
    if (cartItems?.length) {
      this.isAllowedToCart = cartItems[0].cafeId === this.cafeId;
    }
  }

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
