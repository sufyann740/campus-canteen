import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Menu from "./pages/Menu";
import ItemDetails from "./pages/ItemDetails";
import CartPage from "./pages/CartPage";
import "./index.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        <footer className="site-footer">
          <p>© 2026 Campus Canteen. Made for students.</p>
        </footer>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
