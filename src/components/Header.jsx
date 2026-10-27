import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="site-header">
      <Link to="/" className="logo">
        Campus Canteen
      </Link>

      <nav aria-label="Main navigation">
        <Link to="/">Menu</Link>
        <Link to="/cart" className="cart-link">
          Cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
}

export default Header;
