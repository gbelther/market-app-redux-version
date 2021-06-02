import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../components/Product";
import { api } from "../../services/api";

import { IProduct } from "../../types";

import "./styles.scss";

export function Home() {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await api.get("items");
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  function handleAddFilter(event: FormEvent<HTMLInputElement>) {
    const filtered = products.filter((product) =>
      product.description
        .toLocaleLowerCase()
        .includes((event.target as HTMLInputElement).value.toLocaleLowerCase())
    );

    setFilteredProducts(filtered);
  }

  return (
    <>
      <div className="container-home">
        <main className="container-main">
          <section className="inputs-wrapper">
            <input
              type="text"
              placeholder="Filtrar produto..."
              onChange={handleAddFilter}
            />
          </section>

          <section className="products-wrapper">
            {filteredProducts ? (
              filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Product product={product} />
                </Link>
              ))
            ) : (
              <h1>Carregando...</h1>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
