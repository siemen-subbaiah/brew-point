import { Injectable } from '@angular/core';
import { Product } from '../../cafes/models/cafe.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Product[] = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [];

  constructor() {}

  get cartItemCount() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  addToCart(product: Product) {
    const existItem = this.cartItems.find((item) => item.id === product.id);

    if (existItem) {
      this.cartItems = this.cartItems.map((cart) => {
        if (cart.id === product.id) {
          return { ...cart, quantity: cart.quantity ? cart.quantity + 1 : 1 };
        }
        return cart;
      });
    } else {
      this.cartItems = [...this.cartItems, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeFromCart(quantity: number, product: Product) {
    if (quantity === 0) {
      this.cartItems = this.cartItems.filter((cart) => cart.id !== product.id);
    } else {
      this.cartItems = this.cartItems.map((cart) => {
        if (cart.id === product.id) {
          return { ...cart, quantity: cart.quantity - 1 };
        }
        return cart;
      });
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
