import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function Pricing() {

  const [billing, setBilling] = useState("monthly")

  const prices = {
    monthly: {
      balance: 19,
      pro: 39,
      extreme: 79,
    },
    yearly: {
      balance: 190,
      pro: 390,
      extreme: 790,
    },
    lifetime: {
      balance: 500,
      pro: 500,
      extreme: 500,
    }
  }

  const plans = [
    {
      name: "Balance",
      key: "balance",
      features: [
        "1 Trading Account",
        "Basic Statistics",
        "Strategy Journal",
        "Email Support"
      ]
    },
    {
      name: "Pro",
      key: "pro",
      features: [
        "5 Trading Accounts",
        "Advanced Analytics",
        "Backtesting Engine",
        "Priority Support"
      ],
      popular: true
    },
    {
      name: "Extreme",
      key: "extreme",
      features: [
        "Unlimited Accounts",
        "Full Analytics Suite",
        "AI Insights",
        "VIP Support"
      ]
    }
  ]

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar />

      <section className="pricing-page">

        <h1 className="pricing-title">Choose Your Plan</h1>

        {/* Billing Toggle */}
        <div className="billing-toggle">
          <button
            className={billing === "monthly" ? "active" : ""}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>

          <button
            className={billing === "yearly" ? "active" : ""}
            onClick={() => setBilling("yearly")}
          >
            Yearly
          </button>

          <button
            className={billing === "lifetime" ? "active" : ""}
            onClick={() => setBilling("lifetime")}
          >
            Lifetime
          </button>
        </div>

        {/* Plans */}
        <div className="pricing-grid">

          {plans.map(plan => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
            >

              {plan.popular && <div className="badge">Most Popular</div>}

              <h2>{plan.name}</h2>

              <div className="price">
                ${prices[billing][plan.key]}
                {billing !== "lifetime" && <span>/ {billing}</span>}
              </div>

              <ul>
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <button className="btn">
                Get Started
              </button>

            </div>
          ))}

        </div>

      </section>
      <Footer />
    </>
  )
}