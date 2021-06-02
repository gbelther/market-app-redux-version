import { ActionTypes, IProduct } from "./types";

export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartRequest,
    payload: {
      product,
    },
  };
}

export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: {
      product,
    },
  };
}

export function addProductToCartFailure(product_id: number) {
  return {
    type: ActionTypes.addProductToCartFailure,
    payload: {
      product_id,
    },
  };
}

export function decrementProductToCart(product_id: number) {
  return {
    type: ActionTypes.decrementProductFromCart,
    payload: {
      product_id,
    },
  };
}

export function removeProductFromCart(product_id: number) {
  return {
    type: ActionTypes.removeProductFromCart,
    payload: {
      product_id,
    },
  };
}
