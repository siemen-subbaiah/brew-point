import { Product } from '../../cafes/models/cafe.model';

export interface Order {
  id?: string;
  isCanceled?: boolean;
  isDelivered?: boolean;
  timeStamp?: number;
  userId?: string;
  tableNumber: number | null;
  scheduleDetails: any | null;
  isPaid: boolean;
  cartItems: Product[];
}
