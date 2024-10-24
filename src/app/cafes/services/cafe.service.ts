import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cafe } from '../models/cafe.model';

@Injectable({
  providedIn: 'root',
})
export class CafeService {
  firestore = inject(Firestore);
  cafeCollection = collection(this.firestore, 'restaurants');

  listCafes(): Observable<Cafe[]> {
    return collectionData(this.cafeCollection, { idField: 'id' }) as Observable<
      Cafe[]
    >;
  }
}
