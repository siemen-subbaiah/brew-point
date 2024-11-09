import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../cafes/models/cafe.model';
import { from, switchMap, tap } from 'rxjs';
import { StripeService } from 'ngx-stripe';
import { Order } from '../../orders/models/order.model';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  firestore = inject(Firestore);
  orderCollection = collection(this.firestore, 'orders');

  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
  ) {}

  placeOrder(order: Order) {
    const promise = addDoc(this.orderCollection, order);
    return from(promise);
  }

  payCounter(order: Order) {
    return this.placeOrder(order);
  }

  payOnline(order: Order) {
    return this.placeOrder(order);
  }

  stripeCheckout(body: { products: Product[]; isDev: boolean }) {
    return this.http
      .post<any>(
        'https://stripe-payment-intent.siemensubbaiah1.workers.dev/create-checkout-session',
        body,
      )
      .pipe(
        tap((session) => localStorage.setItem('session_id', session.id)),
        switchMap((session) =>
          this.stripeService.redirectToCheckout({ sessionId: session.id }),
        ),
      );
  }

  updateOrder(orderId: string, deliveryTime: number) {
    const orderRef = doc(this.firestore, 'orders', orderId);
    console.log(orderRef);
    const promise = updateDoc(orderRef, {
      isDelivered: true,
      deliveryTime,
    });
    return from(promise);
  }
}
