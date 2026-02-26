import Navbar from "./Navbar"

export default function AuthLayout({ children }) {
  return (
    <>
      {/* Navbar مشترك */}
      <Navbar />

      <div className="auth-layout">

        <div className="auth-left">
          <h1>Trade Smarter</h1>
          <p>Professional Backtesting & Analytics Platform</p>
        </div>

        <div className="auth-right">
          {children}
        </div>

      </div>
    </>
  )
}