import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Cafe } from '../models/cafe.model';

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

  listPopularCafes(): Observable<Cafe[]> {
    const q = query(this.cafeCollection, where('isPopular', '==', true));

    return collectionData(q, {
      idField: 'id',
    }) as Observable<Cafe[]>;
  }
}
