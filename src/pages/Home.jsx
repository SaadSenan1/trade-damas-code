import MainLayout from "../components/MainLayout"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import chart1 from "../assets/charts1.png"
import chart2 from "../assets/charts2.png"
import chart3 from "../assets/charts3.png"
import { useRef, useEffect, useState } from "react"

import {
  FaBolt,
  FaChartLine,
  FaBrain,
  FaUserPlus,
  FaPlay,
  FaChartBar,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from "react-icons/fa"

export default function Home() {

  const imageRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (imageRef.current) observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [])

  const feedbacks = [
    {
      name: "Trader Alex",
      text: "This platform changed my trading completely. The analytics are insane.",
      img: "https://i.pravatar.cc/100?img=1",
      rating: 5
    },
    {
      name: "FX Master",
      text: "Backtesting engine is extremely accurate and easy to use.",
      img: "https://i.pravatar.cc/100?img=2",
      rating: 4.5
    },
    {
      name: "Crypto Hawk",
      text: "Best trading journal I’ve ever used. Clean and powerful.",
      img: "https://i.pravatar.cc/100?img=3",
      rating: 5
    },
    {
      name: "Sniper Trader",
      text: "Helped me become consistently profitable. Highly recommended.",
      img: "https://i.pravatar.cc/100?img=4",
      rating: 4
    },
    {
      name: "Quant Sam",
      text: "Professional level statistics. Feels like institutional tools.",
      img: "https://i.pravatar.cc/100?img=5",
      rating: 5
    }
  ]

  const loopData = [...feedbacks, ...feedbacks]

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} color="#FFD700" />)
      } else if (i - rating <= 0.5) {
        stars.push(<FaStarHalfAlt key={i} color="#FFD700" />)
      } else {
        stars.push(<FaRegStar key={i} color="#FFD700" />)
      }
    }
    return stars
  }

  return (
    <MainLayout>

      <section className="home">

        {/* HERO */}
        <div className="home-hero">
          <div className="hero-content">
            <img src={logo} alt="Tradedamas Logo" className="home-logo" />
            <h1>
              Backtesting
              <span> For Strong Traders</span>
            </h1>
            <p>
              Test strategies with precision, analyze performance,
              and build confidence before risking real capital.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn primary">
                Get Started
              </Link>
              <Link to="/login" className="btn secondary">
                Login
              </Link>
            </div>
          </div>
        </div>


        {/* ===== IMAGE SECTION BEFORE TRUST ===== */}
       
{/* ===== IMAGE SECTION BEFORE TRUST ===== */}

<div
  ref={imageRef}
  className={`charts-stack ${visible ? "show" : ""}`}
>

  
  <div className="chart-item chart-back">
    <img src={chart1} className="chart-card" alt="" />
    <div className="chart-overlay">
      <h4>Advanced Market Analysis</h4>
      <p>Professional statistics and deep performance insights.</p>
    </div>
  </div>

  <div className="chart-item chart-middle">
    <img src={chart2} className="chart-card" alt="" />
    <div className="chart-overlay">
      <h4>Precision Backtesting Engine</h4>
      <p>Simulate trades with realistic market conditions.</p>
    </div>
  </div>

  <div className="chart-item chart-front">
    <img src={chart3} className="chart-card" alt="" />
    <div className="chart-overlay">
      <h4>Win Rate & Risk Tracking</h4>
      <p>Measure accuracy, risk-reward and strategy performance.</p>
    </div>
  </div>

</div>

        {/* TRUST */}
        <div className="home-trust">
          <p>Trusted by traders worldwide</p>
        </div>


        {/* FEATURES */}
        <div className="home-features">
          <div className="feature">
            <div className="feature-icon"><FaBolt /></div>
            <h3>Real Market Simulation</h3>
            <p>
              Experience realistic price action and trading conditions
              with advanced simulation tools.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon"><FaChartLine /></div>
            <h3>Performance Analytics</h3>
            <p>
              Track win rate, risk-reward, equity curves,
              and detailed trading statistics.
            </p>
          </div>

          <div className="feature"><div className="feature-icon"><FaBrain /></div>
            <h3>Strategy Development</h3>
            <p>
              Improve discipline and decision making in a
              risk-free environment.
            </p>
          </div>
        </div>


        {/* HOW IT WORKS */}
        <div className="home-steps">
          <h2>How It Works</h2>

          <div className="steps-grid">
            <div className="step">
              <div className="step-icon"><FaUserPlus /></div>
              <h4>Create Account</h4>
              <p>Sign up and access the platform instantly.</p>
            </div>

            <div className="step">
              <div className="step-icon"><FaPlay /></div>
              <h4>Run Backtests</h4>
              <p>Test your strategy using historical market data.</p>
            </div>

            <div className="step">
              <div className="step-icon"><FaChartBar /></div>
              <h4>Analyze Results</h4>
              <p>Improve performance using professional analytics.</p>
            </div>
          </div>
        </div>


        {/* FEEDBACK */}
        {/* FEEDBACK */}
<div className="home-feedbacks star-bg">

  <div className="stars"></div>
  <div className="stars2"></div>
  <div className="stars3"></div>
  <div className="stars4"></div>

  <h2>What Traders Say?</h2>

  <div className="feedback-track">
  {loopData.map((fb, i) => (
    <div className="feedback-card" key={i}>
      
      <div className="feedback-content">
        <h4>{fb.name}</h4>
        <p>{fb.text}</p>

        <div className="feedback-stars">
          {renderStars(fb.rating)}
        </div>
      </div>

    </div>
  ))}
</div>

</div>

        {/* CTA */}
        <div className="home-cta">
          <h2>Start Improving Your Trading Today</h2>
          <p>
            Join TradeDamas and transform your strategy with
            professional backtesting tools.
          </p>

          <Link to="/register" className="btn primary">
            Create Free Account
          </Link>
        </div>


        {/* STATS */}
        <div className="home-stats">
          <div className="stat"><h3>10K+</h3><p>Backtests Completed</p></div>
          <div className="stat"><h3>500+</h3><p>Active Traders</p></div>
          <div className="stat"><h3>99%</h3><p>Platform Accuracy</p></div>
          <div className="stat"><h3>24/7</h3><p>System Availability</p></div>
        </div>

      </section>

    </MainLayout>
  )
}