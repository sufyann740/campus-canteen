import { useState } from "react";
import ItemCard from "./ItemCard";

function MenuList({ items }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  function toggleFavorite(id) {
    setFavorites((oldFavorites) =>
      oldFavorites.includes(id)
        ? oldFavorites.filter((itemId) => itemId !== id)
        : [...oldFavorites, id],
    );
  }

  return (
    <section>
      <div className="menu-controls">
        <input
          type="search"
          placeholder="Search food..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search menu items"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((itemCategory) => (
            <option key={itemCategory} value={itemCategory}>
              {itemCategory}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div className="menu-item" key={item.id}>
            <button
              className="favorite-button"
              onClick={() => toggleFavorite(item.id)}
              aria-label={
                favorites.includes(item.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              aria-pressed={favorites.includes(item.id)}
            >
              {favorites.includes(item.id) ? "❤️" : "♡"}
            </button>

            <ItemCard item={item} />
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && <p>No menu items found.</p>}
    </section>
  );
}

export default MenuList;
