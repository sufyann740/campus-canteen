import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((oldCart) => {
      const found = oldCart.find((product) => product.id === item.id);

      if (found) {
        return oldCart.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        );
      }

      return [...oldCart, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((oldCart) => oldCart.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((oldCart) =>
      oldCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
