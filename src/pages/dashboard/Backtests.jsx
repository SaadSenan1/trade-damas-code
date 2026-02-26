import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPlus, FaChartLine, FaCoins, FaPercentage } from "react-icons/fa"

export default function Backtests() {

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPair, setSelectedPair] = useState("EUR/USD")
  const [accountValue, setAccountValue] = useState(1000)

  const navigate = useNavigate()

  const handleGoToChart = () => {

    setModalOpen(false)

    navigate("/dashboard/backtest-chart", {
      state: {
        pair: selectedPair,
        balance: Number(accountValue)
      }
    })

  }

  return (
    <div className="backtests-container">

      {/* HERO */}
      <div className="backtests-hero">

        <div className="hero-text">

          <h1>Professional Backtesting</h1>

          <p>
            Test your trading strategies with advanced analytics and realistic market simulations.
          </p>

          <button
            className="start-backtest-btn"
            onClick={() => setModalOpen(true)}
          >
            <FaPlus /> Start New Backtest
          </button>

        </div>

      </div>


      {/* STATS */}
      <div className="backtests-stats">

        <div className="stat-card">
          <FaChartLine />
          <div>
            <h3>Trades</h3>
            <p>245</p>
          </div>
        </div>

        <div className="stat-card">
          <FaPercentage />
          <div>
            <h3>Win Rate</h3>
            <p>68%</p>
          </div>
        </div>

        <div className="stat-card">
          <FaCoins />
          <div>
            <h3>Profit</h3>
            <p>$4,820</p>
          </div>
        </div>

      </div>


      {/* MODAL */}
      {modalOpen && (
        <div className="backtest-modal">

          <div className="modal-content">

            <h2>Start New Backtest</h2>

            <div className="form-group">

              <label>Trading Pair</label>

              <select
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
              >
                <option>EUR/USD</option>
                <option>GBP/USD</option>
                <option>USD/JPY</option>
                <option>BTC/USD</option>
                <option>XAU/USD</option>
              </select>

            </div>


            <div className="form-group">

              <label>Account Balance ($)</label>

              <input
                type="number"
                value={accountValue}
                onChange={(e) => setAccountValue(e.target.value)}
              />

            </div>


            <div className="modal-buttons">

              <button
                className="go-chart-btn"
                onClick={handleGoToChart}
              >
                Go To Chart
              </button>

              <button
                className="cancel-btn"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}