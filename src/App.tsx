import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes } from "./routes";

import "react-toastify/dist/ReactToastify.css";
import "./styles/global.scss";
import { Header } from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <ToastContainer autoClose={2000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
