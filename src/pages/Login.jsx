import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)

    let tempErrors = { email: "", password: "" }
    let hasError = false

    if (!email) { tempErrors.email = "Email is required"; hasError = true }
    if (!password) { tempErrors.password = "Password is required"; hasError = true }

    setErrors(tempErrors)
    if (hasError) { setLoading(false); return }

    const users = JSON.parse(localStorage.getItem("users")) || []
    const existingUser = users.find(u => u.email === email && u.password === password)

    if (!existingUser) {
      setErrors(prev => ({ ...prev, email: "Invalid email or password" }))
      setLoading(false)
      return
    }

    // Simulate network delay for smooth loading
    setTimeout(() => {
      login(existingUser)
      navigate("/dashboard")
    }, 1000)
  }

  const handleGoogleLogin = () => alert("Google login coming soon")

  return (
    <AuthLayout>
      <form className="auth-card glass" onSubmit={handleLogin}>

        <img src="/logo.png" alt="logo" className="auth-logo" />
        <h2>Welcome Back</h2>
        <p className="auth-sub">Login to your account</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })) }}
        />
        {errors.email && <p className="input-error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: "" })) }}
        />
        {errors.password && <p className="input-error">{errors.password}</p>}

        {/* Login Button */}
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Login"}
        </button>

        <div className="divider"><span>OR</span></div>

        <button
          type="button"
          className="btn google"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
          />
          Login with Google
        </button>

        <p>
          No account? <Link to="/register">Register</Link>
        </p>

        <style>{`
          .input-error {
            color: #ff4d4f;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
            font-weight: 500;
          }

          /* Loading Spinner */
          .spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top-color: #00ff9c;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            display: inline-block;
            vertical-align: middle;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Buttons */
          .btn.primary {
            background: linear-gradient(135deg, #00ff9c, #00c853);
            color: #020617;
            font-weight: 600;
            border-radius: 12px;
            padding: 12px 20px;
            font-size: 16px;
            transition: all 0.3s ease;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
          }

          .btn.primary:disabled {
            opacity: 0.7;
            cursor: not-allowed;}

          .btn.primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 255, 156, 0.4);
          }

          .btn.google {
            background: #fff;
            color: #020617;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            padding: 12px 20px;
            border-radius: 12px;
            border: none;
            transition: all 0.3s ease;
          }

          .btn.google:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
        `}</style>

      </form>
    </AuthLayout>
  )
}