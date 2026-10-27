import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ItemDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        const response = await fetch("/menu.json");

        if (!response.ok) {
          throw new Error("Could not load menu.");
        }

        const items = await response.json();
        const selectedItem = items.find((food) => food.id === Number(id));

        if (!selectedItem) {
          throw new Error("Item not found.");
        }

        setItem(selectedItem);
      } catch (err) {
        setError("Food item nahi mila.");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) return <p>Loading item...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="container details-page">
      <Link to="/">← Back to Menu</Link>

      <article className="item-details">
        <img src={item.image} alt={item.name} />

        <div>
          <h1>{item.name}</h1>
          <p>Category: {item.category}</p>
          <p>{item.description}</p>
          <h2>Rs. {item.price}</h2>

          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      </article>
    </main>
  );
}

export default ItemDetails;
