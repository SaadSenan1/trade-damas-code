import { useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { FaTachometerAlt, FaChartLine, FaCogs, FaHistory, FaSignOutAlt, FaBars } from "react-icons/fa"

export default function DashboardLayout() {
  const [open, setOpen] = useState(true)
  const [loadingLogout, setLoadingLogout] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setLoadingLogout(true)

    // Simulate delay 5 ثواني
    setTimeout(() => {
      localStorage.removeItem("user")
      setLoadingLogout(false)
      navigate("/login")
    }, 5000)
  }

  return (
    <div className={`dashboard-wrapper ${open ? "sidebar-open" : "sidebar-collapsed"}`}>
      <aside className={`sidebar ${open ? "open" : "collapsed"}`}>
        {/* Toggle Button */}
        <button className="toggle-btn" onClick={() => setOpen(!open)}>
          <FaBars />
        </button>

        {/* Logo */}
        <div className="sidebar-logo">
          <img src="src/assets/logo.png" alt="TradeDamas Logo" />
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="nav-link">
            <FaTachometerAlt /> <span className="link-text">Overview</span>
          </NavLink>
          <NavLink to="/dashboard/backtests" className="nav-link">
            <FaHistory /> <span className="link-text">Backtests</span>
          </NavLink>
          <NavLink to="/dashboard/analytics" className="nav-link">
            <FaChartLine /> <span className="link-text">Analytics</span>
          </NavLink>
          <NavLink to="/dashboard/settings" className="nav-link">
            <FaCogs /> <span className="link-text">Settings</span>
          </NavLink>

          {/* Logout with Loading */}
          <button className="nav-link logout-btn" onClick={handleLogout} disabled={loadingLogout}>
            <FaSignOutAlt /> 
            <span className="link-text">
              {loadingLogout ? <span className="spinner-small"></span> : "Logout"}
            </span>
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>

      {/* Spinner CSS */}
      <style>{`
        .spinner-small {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #00ff9c;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          vertical-align: middle;
          margin-left: 6px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .logout-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}