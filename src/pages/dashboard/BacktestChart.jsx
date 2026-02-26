import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { createChart } from "lightweight-charts"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi"

export default function BacktestChart() {

  const navigate = useNavigate()

  const chartContainerRef = useRef(null)
  const overlayRef = useRef(null)

  const chartRef = useRef(null)
  const candleSeriesRef = useRef(null)

  const replayIndexRef = useRef(0)
  const replayDataRef = useRef([])

  const [balance] = useState(1000)
  const [menuOpen, setMenuOpen] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // =========================
  // CREATE CHART
  // =========================

  useEffect(() => {

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: "#000" },
        textColor: "#DDD"
      },
      grid: {
        vertLines: { color: "#111" },
        horzLines: { color: "#111" }
      },
      crosshair: {
        mode: 1
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false
      }
    })

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00ff9c",
      downColor: "#ff4976",
      borderUpColor: "#00ff9c",
      borderDownColor: "#ff4976",
      wickUpColor: "#00ff9c",
      wickDownColor: "#ff4976"
    })

    chartRef.current = chart
    candleSeriesRef.current = candleSeries

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight
      })
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [])

  // =========================
  // GENERATE HISTORICAL DATA
  // =========================

  useEffect(() => {

    const data = []

    let price = 1.1000
    let time = Math.floor(Date.now() / 1000)

    for (let i = 0; i < 500; i++) {

      const open = price
      const close = open + (Math.random() - 0.5) * 0.002
      const high = Math.max(open, close) + Math.random() * 0.001
      const low = Math.min(open, close) - Math.random() * 0.001

      data.push({
        time: time + i * 60,
        open,
        high,
        low,
        close
      })

      price = close
    }

    replayDataRef.current = data

  }, [])

  // =========================
  // REPLAY ENGINE
  // =========================

  useEffect(() => {

    if (!isPlaying) return

    const interval = setInterval(() => {

      const candle = replayDataRef.current[replayIndexRef.current]
      if (!candle) return

      candleSeriesRef.current.update(candle)

      replayIndexRef.current++

    }, 400 / speed)

    return () => clearInterval(interval)

  }, [isPlaying, speed])

  // =========================
  // RESET
  // =========================

  const resetReplay = () => {

    replayIndexRef.current = 0
    candleSeriesRef.current.setData([])
    setIsPlaying(false)

  }

  // =========================
  // DRAG PANEL
  // =========================

  useEffect(() => {

    const box = overlayRef.current
    if (!box) return

    let isDown = false
    let offsetX = 0
    let offsetY = 0

    const mouseDown = (e) => {
      isDown = true
      offsetX = e.clientX - box.offsetLeft
      offsetY = e.clientY - box.offsetTop
    }

    const mouseMove = (e) => {
      if (!isDown) return
      box.style.left = e.clientX - offsetX + "px"
      box.style.top = e.clientY - offsetY + "px"
    }

    const mouseUp = () => isDown = false

    box.addEventListener("mousedown", mouseDown)
    document.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseup", mouseUp)

    return () => {
      box.removeEventListener("mousedown", mouseDown)
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseup", mouseUp)
    }

  }, [])

  const handleEndBacktest = () => {
    setLoading(true)
    setTimeout(() => navigate("/dashboard/overview"), 1200)
  }

  // =========================
  // UI
  // =========================

  return (

    <div className={`btpro-page-x9 ${menuOpen ? "menu-open-x9" : ""}`}>

      <div className={`btpro-sidebar-x9 ${menuOpen ? "open-x9" : ""}`}>
        <img src="/logo.png" alt="logo" className="sidebar-logo-x9" />

        <button className="end-btn-x9" onClick={handleEndBacktest}>
          {loading ? "Loading..." : "End Backtest"}
        </button>
      </div>

      <div
        className="sidebar-toggle-x9"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <LuChevronLeft size={22} /> : <LuChevronRight size={22} />}
      </div>

      {/* CHART */}
      <div className="btpro-chart-x9">
        <div
          ref={chartContainerRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* CONTROL PANEL */}
      <div ref={overlayRef} className="btpro-overlay-x9">

        <h3>Balance: ${balance}</h3>

        <label>Speed {speed}x</label>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />

        <div style={{ display: "flex", gap: 10 }}>

          <button onClick={() => setIsPlaying(p => !p)}>
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>

          <button onClick={resetReplay}>
            <FiRotateCcw />
          </button>

        </div>

      </div>

    </div>
  )
}