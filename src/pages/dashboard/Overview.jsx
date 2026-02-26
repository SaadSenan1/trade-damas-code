import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Chart } from "react-chartjs-2";
import { FaBell, FaCrown } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Overview() {

  const userPlan = "Free";
  const notificationsCount = 3;

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);

  /* ================= SLIDER ================= */

  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/5968/5968260.png",
      title: "Go Backtest Now!",
      btn: "Start Backtesting"
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png",
      title: "Follow us on X",
      btn: "Follow on X"
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
      title: "Join our Discord",
      btn: "Join Now"
    }
  ];

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= DATA ================= */

  const notifications = [
    { id: 1, text: "Your backtest finished successfully ✅" },
    { id: 2, text: "New feature added to charts 🚀" },
    { id: 3, text: "Subscription discount available 💰" }
  ];

  const volumeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        type: "bar",
        label: "Trades Volume",
        data: [50, 75, 60, 90, 100, 80],
        backgroundColor: "#00b894",
        borderRadius: 6,
        barPercentage: 0.6,
      }
    ]
  };

  const volumeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Trades Volume" }
    }
  };

  const winRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        type: "line",
        label: "Win Rate %",
        data: [70, 65, 75, 80, 85, 78],
        borderColor: "#0984e3",
        backgroundColor: "rgba(9,132,227,0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
      }
    ]
  };

  const winRateOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Win Rate %" }
    }
  };

  return (
    <div className="overview-container">

      {/* ================= HEADER ================= */}

      <div className="overview-header">

        <div>
          <h2>Overview</h2>
          <p>Summary of your account and trading performance.</p>
        </div>

        <div className="overview-actions">

          <div
            className="notification-btn"
            onClick={() => setShowNotifications(true)}
          >
            <FaBell />
            {notificationsCount > 0 && (
              <span className="notification-badge">
                {notificationsCount}
              </span>
            )}
          </div>

          <div
            className={`plan-badge ${userPlan.toLowerCase()}`}
            onClick={() => setShowSubscriptions(true)}
          >
            <FaCrown />
            <span>{userPlan} Plan</span>
          </div>

        </div>

      </div>


      {/* ================= PROMO SLIDER ================= */}

      <div className="promo-slider">

        <button
          className="slider-arrow left"
          onClick={prevSlide}
        >
          ❮
        </button>

        <div
          className="slides"
          style={{transform: `translateX(-${slideIndex * 100}%)`}}
        >

          {slides.map((s, i) => (
            <div className="slide" key={i}>

              <img
                src={s.img}
                alt=""
                className="slide-logo"
              />

              <h3>{s.title}</h3>

              <button className="slide-btn">
                {s.btn}
              </button>

            </div>
          ))}

        </div>

        <button
          className="slider-arrow right"
          onClick={nextSlide}
        >
          ❯
        </button>

      </div>


      {/* ================= WIDGETS ================= */}

      <div className="dashboard-widgets">

        <div className="widget">
          <h3>Total Backtests</h3>
          <p>120</p>
        </div>

        <div className="widget">
          <h3>Active Strategies</h3>
          <p>5</p>
        </div>

        <div className="widget">
          <h3>Account Balance</h3>
          <p>$10,500</p>
        </div>

      </div>


      {/* ================= CHARTS ================= */}

      <div className="chart-container">
        <Chart type="bar" data={volumeData} options={volumeOptions} />
      </div>

      <div className="chart-container">
        <Chart type="line" data={winRateData} options={winRateOptions} />
      </div>


      {/* ================= NOTIFICATIONS ================= */}

      {showNotifications && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">
              <h3>Notifications</h3>
              <button onClick={() => setShowNotifications(false)}>✖️</button>
            </div>

            <div className="modal-body">
              {notifications.map(n => (
                <div key={n.id} className="notification-item">
                  {n.text}
                </div>
              ))}
            </div>

          </div>

        </div>
      )}


      {/* ================= SUBSCRIPTIONS ================= */}

      {showSubscriptions && (
        <div className="modal-overlay">

          <div className="modal large">

            <div className="modal-header">
              <h3>Subscription Plans</h3>
              <button onClick={() => setShowSubscriptions(false)}>✖️</button>
            </div>

            <div className="plans">

              <div className="plan-card">
                <h4>Free</h4>
                <p>$0 / month</p>
                <ul>
                  <li>Basic Backtesting</li>
                  <li>Limited Charts</li>
                </ul>
                <button className="plan-btn">Current Plan</button>
              </div>

              <div className="plan-card popular">
                <span className="badge">20% OFF</span>
                <h4>Pro</h4>
                <p>$19 / month</p>
                <ul>
                  <li>Unlimited Backtests</li>
                  <li>Advanced Analytics</li>
                  <li>Priority Support</li>
                </ul>
                <button className="plan-btn upgrade">Upgrade</button>
              </div>

              <div className="plan-card">
                <h4>Institutional</h4>
                <p>$49 / month</p>
                <ul>
                  <li>All Pro Features</li>
                  <li>AI Insights</li>
                  <li>Private Servers</li>
                </ul>
                <button className="plan-btn upgrade">Upgrade</button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}