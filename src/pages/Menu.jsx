import { useEffect, useState } from "react";
import MenuList from "../components/MenuList";

function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch("/menu.json");

        if (!response.ok) {
          throw new Error("Failed to load menu.");
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError("Menu load nahi hua. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  if (loading) {
    return <p className="status-message">Loading menu...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <main className="container">
      <h1>Today's Menu</h1>
      <p>Choose your favorite food from our campus canteen.</p>

      <MenuList items={items} />
    </main>
  );
}

export default Menu;
