import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  getOrderType(): number | null {
    const storedOrderType = localStorage.getItem('orderType');
    return storedOrderType ? Number(storedOrderType) : null;
  }
}
