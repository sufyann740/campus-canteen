import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ItemCard({ item }) {
  const { addToCart } = useCart();

  return (
    <article className="item-card">
      <img src={item.image} alt={item.name} />

      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="category">{item.category}</p>
        <p>{item.description}</p>
        <h4>Rs. {item.price}</h4>

        <div className="card-actions">
          <Link to={`/item/${item.id}`}>View Details</Link>

          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
