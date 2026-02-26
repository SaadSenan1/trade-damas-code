import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function FAQ() {

  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      q: "What is backtesting?",
      a: "Backtesting is the process of testing a trading strategy using historical market data to evaluate its performance before risking real capital."
    },
    {
      q: "Is this platform suitable for beginners?",
      a: "Yes. The platform is designed with a simple interface that allows beginners and professionals to test strategies efficiently."
    },
    {
      q: "Do I need trading experience?",
      a: "Basic knowledge of trading is helpful, but not required. You can learn while using the platform."
    },
    {
      q: "Can I track my performance?",
      a: "Yes. The dashboard provides analytics, win rate, profit metrics, and trade history."
    },
    {
      q: "Is my data secure?",
      a: "Security is a top priority. All user data is encrypted and protected using modern security standards."
    },
    {
      q: "Can I use the platform on mobile?",
      a: "Yes. The platform is fully responsive and works seamlessly across desktop, tablet, and mobile devices."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Navbar />

      <section className="faq-page">

        {/* HERO */}
        <div className="faq-hero">
          <h1>Frequently Asked Questions</h1>
          <p>
            Everything you need to know about TradeDamas platform
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="faq-container">

          {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >

              <div className="faq-question">
                <h3>{item.q}</h3>
                <span className="faq-icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              <div className="faq-answer">
                <p>{item.a}</p>
              </div>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="faq-cta">
          <h2>Still have questions?</h2>
          <p>Contact our support team anytime.</p>
          <button className="btn">Contact Support</button>
        </div>

      </section>
      <Footer />
    </>
  )
}