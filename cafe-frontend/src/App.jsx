import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Customer from "./pages/Customer";
import Kitchen from "./pages/Kitchen";
import Admin from "./pages/Admin";
import AdminIngredients from "./pages/AdminIngredients";
import AdminMenu from "./pages/AdminMenu";
import AdminPaymentSettings from "./pages/AdminPaymentSettings";
import NavBar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-ingredients" element={<AdminIngredients />} />
          <Route path="/admin-menu" element={<AdminMenu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/payments" element={<AdminPaymentSettings />} />
        </Routes>
      </Router>
    </Provider>
  );
}
