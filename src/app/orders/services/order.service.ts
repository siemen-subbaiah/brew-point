import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  where,
  query,
  collectionData,
  getDoc,
  doc,
} from '@angular/fire/firestore';
import { Order } from '../models/order.model';
import { from, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  firestore = inject(Firestore);
  orderCollection = collection(this.firestore, 'orders');
  currentOrder$ = new Subject<boolean>();

  constructor() {}

  listCurrentOrder(): Observable<Order[]> {
    const q = query(
      this.orderCollection,
      where('userId', '==', localStorage.getItem('uid')),
      where('isPaid', '==', true),
      where('isDelivered', '==', false),
    );

    return collectionData(q, {
      idField: 'id',
    }) as Observable<Order[]>;
  }

  getOrderById(id: string): Observable<Order> {
    return from(
      getDoc(doc(this.firestore, 'orders', id))
        .then((res) => res.data() as Order)
        .catch((err) => {
          throw err;
        }),
    );
  }
}
