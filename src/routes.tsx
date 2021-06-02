import { Route, Switch } from "react-router-dom";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { AboutProduct } from "./pages/AboutProduct";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" component={AboutProduct} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
}
