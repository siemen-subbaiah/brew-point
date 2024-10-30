import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  orderType!: number | null;

  constructor() {
    this.orderType = localStorage.getItem('orderType')
      ? Number(localStorage.getItem('orderType'))
      : null;
  }
}
