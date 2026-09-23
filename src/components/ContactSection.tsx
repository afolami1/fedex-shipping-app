import "./ContactSection.css";

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-content">
          <span className="contact-label">NEED HELP?</span>

          <h2>
            We're Here to Help
            <br />
            With Your Shipment
          </h2>

          <p>
            Have a question about your shipment? Our support team
            is ready to help you with tracking, delivery, and
            shipping information.
          </p>

          <a
            href="mailto:support@globalship.com"
            className="contact-button"
          >
            Contact Support →
          </a>
        </div>

        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <div>
              <span>Email Support</span>
              <strong>support@globalship.com</strong>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <div>
              <span>Customer Support</span>
              <strong>Available 24/7</strong>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">🌎</div>
            <div>
              <span>Worldwide Service</span>
              <strong>Ship Beyond Borders</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;