import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"


Chart.register(...registerables)

export default function Analytics() {
  const chartRef = useRef(null)
  let myChart = useRef(null)

  // بيانات شارت الربح والخسارة
  const tradesData = [
    { trade: "Trade #1", status: "win" },
    { trade: "Trade #2", status: "loss" },
    { trade: "Trade #3", status: "win" },
    { trade: "Trade #4", status: "loss" },
    { trade: "Trade #5", status: "win" },
    { trade: "Trade #6", status: "win" },
  ]

  useEffect(() => {
    if (chartRef.current) {
      if (myChart.current) myChart.current.destroy()

      myChart.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue ($)",
              data: [1200, 1900, 3000, 2500, 3200, 4000],
              backgroundColor: "#00b894",
              borderRadius: 6,
              barPercentage: 0.6,
            },
            {
              label: "Expenses ($)",
              data: [800, 1200, 2500, 2000, 2800, 3000],
              backgroundColor: "#ff7675",
              borderRadius: 6,
              barPercentage: 0.6,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: "#2d3436", font: { weight: 600, size: 14 } },
            },
            tooltip: {
              enabled: true,
              backgroundColor: "#00b894",
              titleColor: "#fff",
              bodyColor: "#fff",
              bodyFont: { size: 13 },
            }
          },
          scales: {
            x: {
              ticks: { color: "#2d3436", font: { size: 13, weight: 500 } },
              grid: { display: false }
            },
            y: {
              ticks: { color: "#2d3436", font: { size: 13, weight: 500 } },
              grid: { color: "#dfe6e9" }
            }
          }
        }
      })
    }

    return () => {
      if (myChart.current) myChart.current.destroy()
    }
  }, [])

  return (
    <div className="analytics-container">
      <h2>Analytics Overview</h2>
      <p>Track your revenue, expenses, and trading performance trends.</p>

      {/* شارت الفوليوم والربح/الخسارة */}
      <div className="chart-wrapper">
        <canvas ref={chartRef}></canvas>
      </div>

      {/* جدول الصفقات */}
      <div className="trades-table-container">
        <h3>Trades Performance</h3>
        <table className="trades-table">
          <thead>
            <tr>
              <th>Trade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tradesData.map((t, i) => (
              <tr key={i}>
                <td>{t.trade}</td>
                <td className={t.status === "win" ? "win" : "loss"}>
                  {t.status === "win" ? "Win" : "Loss"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Widgets الملخص */}
      <div className="analytics-widgets">
        <div className="widget">
          <h3>Total Revenue</h3>
          <p>$16,800</p>
        </div>
        <div className="widget">
          <h3>Total Expenses</h3>
          <p>$12,400</p>
        </div>
        <div className="widget">
          <h3>Net Profit</h3>
          <p>$4,400</p>
        </div>
      </div>
    </div>
  )
}