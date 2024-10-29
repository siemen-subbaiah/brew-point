export interface Cafe {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  orderType: number[];
  isPopular: boolean;
}

export interface Product {
  id: string;
  cafeId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  productType: number;
  quantity: number;
}
