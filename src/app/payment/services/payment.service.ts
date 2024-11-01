import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../cafes/models/cafe.model';
import { from, switchMap, tap } from 'rxjs';
import { StripeService } from 'ngx-stripe';
import { Order } from '../../orders/models/order.model';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

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
    const body = {
      userId: localStorage.getItem('uid'),
      isPaid: order.isPaid,
      isCanceled: order.isCanceled,
      isDelivered: false,
      timeStamp: new Date().getTime(),
      tableNumber: order.tableNumber,
      scheduleDetails: order.scheduleDetails,
      products: order.cartItems,
    };

    const promise = addDoc(this.orderCollection, body);
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
}
