import produce from "immer";
import { toast } from "react-toastify";
import { Reducer } from "redux";
import { ActionTypes, ICart, ICartItem } from "./types";

const cartStorageString = localStorage.getItem("MarketApp:cart");
let cartStorageItems: ICartItem[] = [];

if (cartStorageString) {
  cartStorageItems = JSON.parse(cartStorageString);
}

const INITIAL_STATE: ICart = {
  items: cartStorageItems.length > 0 ? cartStorageItems : [],
  productsNoStock: [],
};

const cart: Reducer<ICart> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].amount++;
          toast.success("Adicionado mais uma unidade ao carrinho");
        } else {
          draft.items.push({
            product,
            amount: 1,
          });
          toast.success("Produto adicionado ao carrinho");
        }

        break;
      }

      case ActionTypes.addProductToCartFailure: {
        draft.productsNoStock.push(action.payload.product_id);
        toast.warning("Produto sem estoque");

        break;
      }

      case ActionTypes.decrementProductFromCart: {
        const { product_id } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product_id
        );

        const productNoStockIndex = draft.productsNoStock.findIndex(
          (noStock) => noStock === product_id
        );

        if (productInCartIndex >= 0) {
          if (draft.items[productInCartIndex].amount > 1) {
            draft.items[productInCartIndex].amount--;
            toast.success("Removido uma unidade do produto do carrinho");

            break;
          }

          if (draft.items[productInCartIndex].amount === 1) {
            draft.items.splice(productInCartIndex, 1);
            toast.warning("Produto removido do carrinho");

            break;
          }

          productNoStockIndex >= 0 &&
            draft.productsNoStock.splice(productNoStockIndex, 1);
        }

        break;
      }

      case ActionTypes.removeProductFromCart: {
        const { product_id } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product_id
        );

        const productNoStockIndex = draft.productsNoStock.findIndex(
          (noStock) => noStock === product_id
        );

        if (productInCartIndex >= 0) {
          draft.items.splice(productInCartIndex, 1);
          toast.warning("Produto removido do carrinho");

          break;
        }

        productNoStockIndex >= 0 &&
          draft.productsNoStock.splice(productNoStockIndex, 1);

        break;
      }

      default: {
        return draft;
      }
    }

    localStorage.setItem("MarketApp:cart", JSON.stringify(draft.items));
  });
};

export default cart;
