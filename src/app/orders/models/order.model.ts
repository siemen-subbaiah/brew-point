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

export interface OrderDetails {
  orderType: number | null;
  cafeID: string | null;
  cafeName: string | null;
  tableId: number | null;
  guest: number | null;
  selectedDate: Date | null;
  selectedTime: Date | null;
  selectedEndTime: Date | null;
}
