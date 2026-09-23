import "./hero.css";

type HeroProps = {
  onCreateShipment: () => void;
  onTrackPackage: () => void;
};

function Hero({ onCreateShipment, onTrackPackage }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-image-plane"></div>
      <div className="hero-image-truck"></div>
      <div className="hero-overlay"></div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-label">
            FAST <span>•</span> SAFE <span>•</span> RELIABLE
          </div>

          <h1>
            Worldwide Shipping
            <br />
            Made <span>Simple</span>
          </h1>

          <p>
            Send packages, track deliveries, and connect your
            world with GlobalShip. Safe, fast and always on time.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="hero-primary-button"
              onClick={onCreateShipment}
            >
              📦 Create Shipment
            </button>

            <button
              type="button"
              className="hero-secondary-button"
              onClick={onTrackPackage}
            >
              🔍 Track Package
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;