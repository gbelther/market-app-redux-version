export enum ActionTypes {
  addProductToCartRequest = "ADD_PRODUCT_TO_CART_REQUEST",
  addProductToCartSuccess = "ADD_PRODUCT_TO_CART_SUCCESS",
  addProductToCartFailure = "ADD_PRODUCT_TO_CART_FAILURE",
  decrementProductFromCart = "DECREMENT_PRODUCT_FROM_CART",
  removeProductFromCart = "REMOVE_PRODUCT_FROM_CART",
}

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

export interface ICartItem {
  product: IProduct;
  amount: number;
}

export interface ICart {
  items: ICartItem[];
  productsNoStock: number[];
}

export interface ICartState {
  cart: ICart;
}
