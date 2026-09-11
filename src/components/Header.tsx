import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="fed">Fed</span>
        <span className="ex">Ex</span>
      </div>

      <div className="company">
        <h2>Express</h2>
        <p>Global Logistics</p>
      </div>

      <button className="signin">Sign In</button>
    </header>
  );
}

export default Header;