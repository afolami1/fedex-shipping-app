import "./Services.css";

const services = [
  {
    icon: "✈️",
    title: "Air Freight",
    description:
      "Fast international shipping for packages that need to arrive quickly.",
  },
  {
    icon: "🚚",
    title: "Ground Delivery",
    description:
      "Reliable door-to-door delivery for local and regional shipments.",
  },
  {
    icon: "🚢",
    title: "Ocean Freight",
    description:
      "Cost-effective shipping for large, heavy, and commercial cargo.",
  },
];

function Services() {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-heading">
          <span>OUR SERVICES</span>
          <h2>Shipping Solutions For Every Need</h2>
          <p>
            Choose the delivery option that works best for your
            package, destination, and schedule.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title}>
              <div className="service-icon">{service.icon}</div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <span className="service-link">
                Learn more →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;