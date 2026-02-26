import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="sidebar glass">

      <h2>TradePro</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/backtest">Backtest</Link>
      </nav>

    </aside>
  )
}