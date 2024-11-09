import { Product } from '../../cafes/models/cafe.model';

export interface Order {
  id?: string;
  userId?: string;
  isPaid: boolean;
  isCanceled?: boolean;
  isDelivered?: boolean;
  timeStamp: number;
  orderType?: number;
  cafeID?: string;
  cafeName?: string;
  tableId?: number | null;
  guest?: number | null;
  selectedDate?: number | null;
  selectedTime?: number | null;
  selectedEndTime?: number | null;
  deliveryTime?: number | null;
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
