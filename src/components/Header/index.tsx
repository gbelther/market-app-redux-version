import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ICart, ICartState } from "../../store/modules/cart/types";
import "./styles.scss";

export function Header() {
  const cart = useSelector<ICartState, ICart>((state) => state.cart);

  return (
    <header className="container-header">
      <Link to="/">
        <div className="logo">
          <img src="/logo.svg" alt="Market App" />
          <p>Market App</p>
        </div>
      </Link>
      <div className="cart">
        <Link to="/cart">
          <FaShoppingCart size={30} />
          <p>Carrinho</p>
        </Link>
        <p id="items-amount">{cart.items.length}</p>
      </div>
    </header>
  );
}
