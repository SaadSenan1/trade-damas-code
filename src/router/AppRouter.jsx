import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import DashboardLayout from "../components/DashboardLayout"
import Overview from "../pages/dashboard/Overview"
import Backtests from "../pages/dashboard/Backtests"
import Analytics from "../pages/dashboard/Analytics"
import Settings from "../pages/dashboard/Settings"
import Backtest from "../pages/Backtest"
import About from "../pages/About"
import FAQ from "../pages/FAQ"
import Pricing from "../pages/Pricing"
import BacktestChart from "../pages/dashboard/BacktestChart"   // ✅ الصفحة الجديدة

import { AuthProvider, useAuth } from "../context/AuthContext"


function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="backtests" element={<Backtests />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />

            {/* ✅ BACKTEST CHART ROUTE */}
            <Route path="backtest-chart" element={<BacktestChart />} />

          </Route>

          {/* Optional standalone page */}
          <Route
            path="/backtest"
            element={
              <PrivateRoute>
                <Backtest />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}