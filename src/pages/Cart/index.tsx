import { FormEvent, useEffect, useState } from "react";
import { formatPrice } from "../../util/format";
import { FiTrash2 } from "react-icons/fi";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ICart,
  ICartItem,
  ICartState,
  IProduct,
} from "../../store/modules/cart/types";
import {
  addProductToCartRequest,
  decrementProductToCart,
  removeProductFromCart,
} from "../../store/modules/cart/actions";
import { api } from "../../services/api";

export function Cart() {
  const [filteredProducts, setFilteredProducts] = useState<ICartItem[]>([]);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    async function getDeliveryTax() {
      try {
        const { data } = await api.get("/delivery_tax");

        if (data) {
          setTax(data.tax);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getDeliveryTax();
  }, []);

  const dispatch = useDispatch();
  const cart = useSelector<ICartState, ICart>((state) => state.cart);

  useEffect(() => {
    setFilteredProducts(cart.items);
  }, [cart]);

  function handleAmountToCartChange(product: IProduct, type: string) {
    if (type === "-") {
      dispatch(decrementProductToCart(product.id));
    }

    if (type === "+") {
      dispatch(addProductToCartRequest(product));
    }
  }

  function finalPriceOfProduct({ product, amount }: ICartItem) {
    if (product.promotion) {
      const price = product.offer
        ? (amount - Math.trunc(amount / product.promotion.value)) *
          product.offer
        : (amount - Math.trunc(amount / product.promotion.value)) *
          product.price;

      return price;
    }

    if (product.offer) return amount * product.offer;

    return amount * product.price;
  }

  function finalPriceOfAll() {
    let finalPrice = cart.items.reduce((previous, item) => {
      return previous + finalPriceOfProduct(item);
    }, 0);
    filteredProducts.length > 0 && (finalPrice += tax);
    return finalPrice;
  }

  function handleAddFilterProducts(event: FormEvent<HTMLInputElement>) {
    const filtered = cart.items.filter((item) =>
      item.product.description
        .toLocaleLowerCase()
        .includes((event.target as HTMLInputElement).value.toLocaleLowerCase())
    );
    setFilteredProducts(filtered);
  }

  function handleDeleteProductFromCart(productId: number) {
    dispatch(removeProductFromCart(productId));
  }

  return (
    <>
      <main className="container-cart">
        <section className="prodcuts-filter">
          <p>Carrinho</p>
          <input
            type="text"
            placeholder="Filtrar produto..."
            onChange={handleAddFilterProducts}
          />
        </section>

        {filteredProducts &&
          filteredProducts.map((item) => (
            <section key={item.product.id} className="product-in-cart">
              <img src={item.product.image} alt="Pineapple" />
              <div className="product-info">
                <div className="product-info-wrap">
                  <div className="product-change-amount">
                    <button
                      type="button"
                      value="-"
                      onClick={() =>
                        handleAmountToCartChange(item.product, "-")
                      }
                    >
                      -
                    </button>
                    <p>{item.amount}</p>
                    <button
                      type="button"
                      value="+"
                      onClick={() =>
                        handleAmountToCartChange(item.product, "+")
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <p>{item.product.description}</p>
              </div>
              <div className="product-delete">
                <FiTrash2
                  size={20}
                  onClick={() => handleDeleteProductFromCart(item.product.id)}
                />
              </div>
              <div className="product-final-value">
                <p>{formatPrice(finalPriceOfProduct(item))}</p>
                {item.product.promotion &&
                  (item.amount + 1) % item.product.promotion.value === 0 && (
                    <span>
                      Adicione mais uma unidade e pague esse mesmo valor
                    </span>
                  )}
              </div>
            </section>
          ))}

        <section className="products-value">
          <div className="freight">
            <p>Frete:</p>
            <p>{filteredProducts.length > 0 && formatPrice(tax)}</p>
          </div>
          <div className="products-balance">
            <p>Total: </p>
            <p>{formatPrice(finalPriceOfAll())}</p>
          </div>
          <div className="products-buy">
            <button>Finalizar</button>
          </div>
        </section>
      </main>
    </>
  );
}
