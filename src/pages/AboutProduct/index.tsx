import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import {
  addProductToCartRequest,
  decrementProductToCart,
} from "../../store/modules/cart/actions";
import { ICart, ICartState } from "../../store/modules/cart/types";
import { IProduct } from "../../types";
import { formatPrice } from "../../util/format";

import "./styles.scss";

export function AboutProduct(): JSX.Element {
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    order_number: 0,
    price: 0,
    image: "",
    description: "",
    offer: 0,
    promotion: {
      kind: "",
      base: 0,
      value: 0,
    },
  });

  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const cart = useSelector<ICartState, ICart>((state) => state.cart);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getProduct() {
      try {
        const { data } = await api.get(`items/${id}`);

        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    }

    getProduct();
  }, [id]);

  useEffect(() => {
    const productFilteredArray = cart.items.filter(
      (item) => item.product.id === product.id
    );

    if (productFilteredArray.length === 1) {
      setAmount(productFilteredArray[0].amount);
    }
  }, [cart, product]);

  function handleAmountToCartChange(type: string) {
    if (product) {
      if (type === "-") {
        dispatch(decrementProductToCart(product.id));
      }

      if (type === "+") {
        dispatch(addProductToCartRequest(product));
      }
    }
  }

  return (
    <>
      <main className="container">
        {product ? (
          <>
            <div className="product-title">
              <p>{product.description}</p>
            </div>
            <img src={product.image} alt="Pineapple" />
            <section className="product-onsale">
              {product.promotion && (
                <>
                  <p>
                    Promoção <img src="/sale-tag.png" alt="" />
                  </p>
                  <p>
                    Na compra de {product.promotion.base} produtos você leva{" "}
                    {product.promotion.value}
                  </p>
                </>
              )}
            </section>
            <section className="product-price">
              {product.offer ? (
                <>
                  <p>{formatPrice(product.offer)}</p>
                  <s>{formatPrice(product.price)}</s>
                </>
              ) : (
                <p>{formatPrice(product.price)}</p>
              )}
            </section>
            <section className="product-to-cart">
              <button
                className="product-change-amount-button"
                type="button"
                value="-"
                onClick={() => handleAmountToCartChange("-")}
              >
                -
              </button>
              <div
                className={
                  amount > 0 ? "product-amount-positive" : "product-amount-zero"
                }
              >
                <p>Quantidade no carrinho</p> <p>|</p> <p>{amount}</p>
              </div>
              <button
                className="product-change-amount-button"
                type="button"
                value="+"
                onClick={() => handleAmountToCartChange("+")}
              >
                +
              </button>
            </section>
          </>
        ) : (
          <h1>Carregando...</h1>
        )}
      </main>
    </>
  );
}
