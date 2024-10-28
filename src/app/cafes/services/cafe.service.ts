import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
import { Cafe, Product } from '../models/cafe.model';

@Injectable({
  providedIn: 'root',
})
export class CafeService {
  firestore = inject(Firestore);
  cafeCollection = collection(this.firestore, 'restaurants');
  allCafes$ = new Subject<{ id: string; name: string }[]>();

  listCafes(): Observable<Cafe[]> {
    return collectionData(this.cafeCollection, { idField: 'id' }) as Observable<
      Cafe[]
    >;
  }

  getCafeById(id: string): Observable<Cafe> {
    return from(
      getDoc(doc(this.firestore, 'restaurants', id))
        .then((res) => res.data() as Cafe)
        .catch((err) => {
          throw err;
        })
    );
  }

  listProductsByCafeId(id: string): Observable<Product[]> {
    return collectionData(
      collection(this.firestore, 'restaurants', id, 'products'),
      { idField: 'id' }
    ) as Observable<Product[]>;
  }

  listPopularCafes(): Observable<Cafe[]> {
    const q = query(this.cafeCollection, where('isPopular', '==', true));

    return collectionData(q, {
      idField: 'id',
    }) as Observable<Cafe[]>;
  }
}
