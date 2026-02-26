import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "../assets/logo.png"

export default function Navbar() {

  const [open, setOpen] = useState(false)

  return (
    <header className="navbar glass">

      {/* Logo */}
      <Link to="/" className="logo" onClick={() => setOpen(false)}>
        <img src={logo} alt="TradeDamas" className="logo-img" />
        <span className="logo-text">
          Trade<span>Damas</span>
        </span>
      </Link>


      {/* Hamburger */}
      <div
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>


      {/* Navigation */}
      <nav className={open ? "open" : ""}>

        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>

        <Link to="/pricing" onClick={() => setOpen(false)}>
          Pricing
        </Link>

        <Link to="/faq" onClick={() => setOpen(false)}>
          FAQ
        </Link>

        <Link to="/about" onClick={() => setOpen(false)}>
          About
        </Link>

        <Link to="/login" onClick={() => setOpen(false)}>
          Login
        </Link>

        <Link
          to="/register"
          className="btn nav-cta"
          onClick={() => setOpen(false)}
        >
          Get Started
        </Link>

      </nav>

    </header>
  )
}