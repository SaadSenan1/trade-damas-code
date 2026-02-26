import { useState } from "react"
import { FaBell, FaGift } from "react-icons/fa"
import DashboardLayout from "../components/DashboardLayout"

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSubscriptions, setShowSubscriptions] = useState(false)

  const notifications = [
    "New backtest completed",
    "Strategy XYZ updated",
    "Account login from new device",
  ]

  const subscriptions = [
    "Premium Plan - $49/month",
    "Pro Plan - $99/month",
    "Enterprise Plan - Contact us",
  ]

  return (
    <DashboardLayout>
      {/* Header Buttons */}
      <div className="dashboard-header">
        <div className="header-buttons">
          {/* Notification Button */}
          <div className="header-btn-wrapper">
            <button
              className="header-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell />
            </button>
            {showNotifications && (
              <div className="dropdown">
                {notifications.map((note, index) => (
                  <div key={index} className="dropdown-item">
                    {note}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subscription Button */}
          <div className="header-btn-wrapper">
            <button
              className="header-btn"
              onClick={() => setShowSubscriptions(!showSubscriptions)}
            >
              <FaGift />
            </button>
            {showSubscriptions && (
              <div className="dropdown">
                {subscriptions.map((sub, index) => (
                  <div key={index} className="dropdown-item">
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Welcome */}
      <h1>Welcome to Your Dashboard</h1>
      <p>Here you can view your backtests, analytics, and account settings.</p>

      {/* Widgets */}
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
    </DashboardLayout>
  )
}