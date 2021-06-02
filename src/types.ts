export interface IProduct {
  id: number;
  order_number: number;
  price: number;
  image: string;
  description: string;
  offer?: number;
  promotion?: {
    kind: string;
    base: number;
    value: number;
  };
}

export interface IProductInCart extends IProduct {
  amount: number;
}
