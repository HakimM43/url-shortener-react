function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <a href="#" className="logo">
          Shortly
        </a>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
        </div>

        <div className="nav-actions">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </nav>
    </header>
  )
}

export default Header