import { formatPrice } from "../../util/format";
import "./styles.scss";

import { IProduct } from "../../types";

interface IProductProps {
  product: IProduct;
}

export function Product({ product }: IProductProps) {
  return (
    <div className="product">
      {product.promotion && (
        <img src="sale-tag.png" alt="Offer" className="offer-tag" />
      )}

      <img src={product.image} alt="pineapple" />
      <div className="product-info">
        <p>{product.description}</p>
        <div className="product-price">
          {product.offer ? (
            <>
              <p style={{ color: "var(--orange-500)" }}>
                {formatPrice(product.offer)}
              </p>
              <s>{formatPrice(product.price)}</s>
            </>
          ) : (
            <p>{formatPrice(product.price)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
