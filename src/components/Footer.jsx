import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { FaDiscord, FaXTwitter, FaInstagram } from "react-icons/fa6"
import { FaEnvelope } from "react-icons/fa"

export default function Footer() {

  const [visible, setVisible] = useState(false)

  // ===== SMART SCROLL SHOW / HIDE =====
  useEffect(() => {

    const handleScroll = () => {

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.body.scrollHeight

      const distanceFromBottom = docHeight - (scrollTop + windowHeight)

      if (distanceFromBottom < 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }

    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])


  return (
    <footer className={`footer ${visible ? "show" : ""}`}>

      <div className="footer-container">

        {/* ===== BRAND ===== */}
        <div className="footer-brand">

          <img src={logo} alt="logo" />

          <p>
            Professional backtesting platform designed for traders
            who demand precision, analytics, and performance.
          </p>

          <div className="footer-social">

  <a href="mailto:support@tradedamas.com">
    <FaEnvelope />
  </a>

  <a href="https://discord.com" target="_blank">
    <FaDiscord />
  </a>

  <a href="https://x.com" target="_blank">
    <FaXTwitter />
  </a>

  <a href="https://instagram.com" target="_blank">
    <FaInstagram />
  </a>

</div>
        </div>


        {/* ===== NAVIGATION ===== */}
        <div className="footer-col">

          <h4>Navigation</h4>

          <Link to="/">Home</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About</Link>

        </div>


        {/* ===== LEGAL ===== */}
        <div className="footer-col">

          <h4>Legal</h4>

          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>

        </div>


        {/* ===== SUPPORT ===== */}
        <div className="footer-col">

          <h4>Support</h4>

          <a href="mailto:support@tradedamas.com">support@tradedamas.com</a>
          <a href="#">Discord Community</a>
          <a href="#">Contact Us</a>

        </div>

      </div>


      {/* ===== BOTTOM ===== */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} TradeDamas. All rights reserved.
        </p>

      </div>

    </footer>
  )
}