import "./Header.css";

function Header() {
return (
<header className="site-header">
<div className="header-container">
<a href="/" className="brand">
<div className="brand-icon">✈</div>
      <div className="brand-text">
        <span className="brand-name">
          Global<span>Ship</span>
        </span>
        <small>Ship Beyond Borders</small>
      </div>
    </a>

    <nav className="main-nav">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#tracking">Tracking</a>
      <a href="#contact">Contact</a>
    </nav>

    <a href="#tracking" className="track-button">
      🔍 Track Package
    </a>
  </div>
</header>
);
}

export default Header;