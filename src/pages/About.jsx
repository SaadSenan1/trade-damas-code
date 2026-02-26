import Navbar from "../components/Navbar"
import { FaBolt, FaChartLine, FaBrain } from "react-icons/fa"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
export default function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">

        {/* HERO */}
        <div className="about-hero">
          <h1>About TradeDamas</h1>
          <p>
            A professional platform designed to help traders master their
            strategies through realistic backtesting and powerful analytics.
          </p>
        </div>


        {/* STORY */}
        <div className="about-section">

          <div className="about-text">
            <h2>Our Story</h2>

            <p>
              Trading success is not built on luck — it is built on data,
              discipline, and continuous improvement.
            </p>

            <p>
              TradeDamas was created to give traders a realistic environment
              where they can test ideas, analyze performance, and refine
              strategies without risking capital.
            </p>

            <p>
              Whether you are a beginner or an experienced trader, our goal is
              to provide the tools you need to grow with confidence.
            </p>
          </div>

        </div>


        {/* STATS */}
        <div className="about-stats">

          <div className="stat">
            <h3>10K+</h3>
            <p>Backtests Performed</p>
          </div>

          <div className="stat">
            <h3>500+</h3>
            <p>Active Traders</p>
          </div>

          <div className="stat">
            <h3>99%</h3>
            <p>Platform Reliability</p>
          </div>

          <div className="stat">
            <h3>24/7</h3>
            <p>System Availability</p>
          </div>

        </div>


        {/* FEATURES */}
        <div className="about-features">

          <div className="feature-card">
            <h3>
              <FaBolt className="icon" />
              Realistic Backtesting
            </h3>
            <p>
              Simulate market conditions with precision using historical data
              and advanced chart tools.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              <FaChartLine className="icon" />
              Performance Analytics
            </h3>
            <p>
              Track win rate, risk metrics, and detailed trade history to
              optimize your strategy.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              <FaBrain className="icon" />
              Strategy Development
            </h3>
            <p>
              Experiment with ideas in a risk-free environment and improve
              decision-making skills.
            </p>
          </div>

        </div>


        {/* MISSION VISION */}
        <div className="about-cards">

          <div className="about-card">
            <h3>.Mission</h3>
            <p>
              Empower traders with professional tools to master strategy
              development and decision making.
            </p>
          </div>

          <div className="about-card">
            <h3>.Vision</h3>
            <p>
              Become a leading global platform for trading education,
              simulation, and performance analysis.
            </p>
          </div>

          <div className="about-card">
            <h3>.Technology</h3>
            <p>
              Built with modern technologies delivering speed, accuracy,
              and seamless user experience across devices.
            </p>
          </div>

        </div>


        {/* CTA */}
        <div className="about-cta">

          <h2>Start Your Trading Journey Today</h2>
          <p>
            Join TradeDamas and improve your strategy with professional tools.
          </p>

          <Link to="/register" className="btn">
  Start Backtesting
</Link>
        </div>

      </section>
      <Footer />
    </>
  )
}