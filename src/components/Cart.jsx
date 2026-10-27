import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Add some delicious food from our menu!</p>
        <Link to="/">Browse Menu</Link>
      </section>
    );
  }

  return (
    <section className="cart-container">
      <h1>Your Order</h1>

      {cart.map((item) => (
        <article className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>Rs. {item.price} each</p>

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) =>
                  updateQuantity(item.id, Number(event.target.value))
                }
              />
            </label>

            <p>Subtotal: Rs. {item.price * item.quantity}</p>

            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </article>
      ))}

      <h2>Total: Rs. {cartTotal}</h2>

      <Link to="/">Continue Shopping</Link>
    </section>
  );
}

export default Cart;
