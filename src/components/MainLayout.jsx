import Navbar from "./Navbar"
import Footer from "./Footer"

export default function MainLayout({ children }) {
  return (
    <div className="layout">

      <Navbar />

      <main className="container">
        {children}
      </main>

      <Footer />

    </div>
  )
}