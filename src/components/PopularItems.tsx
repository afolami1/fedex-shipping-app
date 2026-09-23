import "./PopularItems.css";

const items = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mobile Phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Documents",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Computer",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
  },
];

function PopularItems() {
  return (
    <section className="popular-items" id="services">
      <div className="popular-items-container">
        <div className="popular-items-heading">
          <span>WHAT WE SHIP</span>
          <h2>Popular Shipping Items</h2>
          <p>
            From everyday essentials to valuable electronics,
            GlobalShip helps move your items safely around the world.
          </p>
        </div>

        <div className="popular-items-grid">
          {items.map((item) => (
            <div className="popular-item-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="popular-item-content">
                <h3>{item.name}</h3>
                <span>Ship this item →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularItems;