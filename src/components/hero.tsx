import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Worldwide Shipping Made Easy</h1>

        <p>
          Create shipments, track packages, print receipts, and manage deliveries
          from one dashboard.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Create Shipment</button>
          <button className="secondary-btn">Track Package</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;