import "./WhyChoose.css";

const features = [
  {
    icon: "⚡",
    title: "Fast Delivery",
    description:
      "We help move your shipments quickly with efficient delivery routes.",
  },
  {
    icon: "🔒",
    title: "Secure Shipping",
    description:
      "Your packages are handled carefully from pickup to final delivery.",
  },
  {
    icon: "🌎",
    title: "Worldwide Coverage",
    description:
      "Connect with destinations around the world through GlobalShip.",
  },
  {
    icon: "📍",
    title: "24/7 Tracking",
    description:
      "Track your shipment and stay updated throughout its journey.",
  },
];

function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="why-choose-container">
        <div className="why-choose-heading">
          <span>WHY GLOBALSHIP</span>
          <h2>Shipping You Can Count On</h2>
          <p>
            Simple shipping solutions designed to keep your
            packages moving safely and efficiently.
          </p>
        </div>

        <div className="why-choose-grid">
          {features.map((feature) => (
            <div className="why-choose-card" key={feature.title}>
              <div className="why-choose-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;