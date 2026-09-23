import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">✈</span>

            <div>
              <strong>
                Global<span>Ship</span>
              </strong>
              <small>Ship Beyond Borders</small>
            </div>
          </div>

          <p>
            Simple, secure and reliable shipping solutions
            connecting your world.
          </p>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-column">
          <h3>Shipping</h3>
          <a href="#services">Air Freight</a>
          <a href="#services">Ground Delivery</a>
          <a href="#services">Ocean Freight</a>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <a href="#tracking">Track Package</a>
          <a href="#contact">Customer Support</a>
          <a href="#contact">Help Center</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2020 GlobalShip. All rights reserved.</p>

        <p>Fast • Safe • Reliable</p>
      </div>
    </footer>
  );
}

export default Footer;