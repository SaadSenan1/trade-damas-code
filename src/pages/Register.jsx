import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false) // ✅ مودال الشروط

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    let tempErrors = {}
    let hasError = false

    if (!firstName) { tempErrors.firstName = "First Name is required"; hasError = true }
    if (!lastName) { tempErrors.lastName = "Last Name is required"; hasError = true }
    if (!email) { tempErrors.email = "Email is required"; hasError = true }
    if (!password) { tempErrors.password = "Password is required"; hasError = true }
    if (!confirmPassword) { tempErrors.confirmPassword = "Confirm Password is required"; hasError = true }
    if (!agreeTerms) { tempErrors.agreeTerms = "You must accept Terms & Conditions"; hasError = true }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/ // Capital + Number + 8 chars min
    if (password && !passwordRegex.test(password)) {
      tempErrors.password = "Password must be at least 8 chars, include 1 capital & 1 number"
      hasError = true
    }
    if (password && confirmPassword && password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match"
      hasError = true
    }

    setErrors(tempErrors)
    if (hasError) { setLoading(false); return }

    const users = JSON.parse(localStorage.getItem("users")) || []
    const existingUser = users.find(u => u.email === email)
    if (existingUser) { 
      setErrors(prev => ({ ...prev, email: "Email already registered! Please login." }))
      setLoading(false)
      return 
    }

    const newUser = { firstName, lastName, email, password }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    setTimeout(() => {
      login(newUser)
      navigate("/dashboard")
    }, 1000)
  }

  const handleGoogleRegister = () => alert("Google registration coming soon")

  return (
    <AuthLayout>
      <form className="auth-card glass" onSubmit={handleRegister}>
        <img src="/logo.png" alt="logo" className="auth-logo" />
        <h2>Welcome to Tradedamas</h2>
        <p className="auth-sub">Create your account</p>

        {/* First & Last Name */}
        <div className="name-row">
          <div className="name-input">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: "" })) }}
            />
            {errors.firstName && <p className="input-error">{errors.firstName}</p>}
          </div>
          <div className="name-input">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: "" })) }}
            />
            {errors.lastName && <p className="input-error">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })) }}
        />
        {errors.email && <p className="input-error">{errors.email}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: "" })) }}
        />
        {errors.password && <p className="input-error">{errors.password}</p>}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: "" })) }}
        />
        {errors.confirmPassword && <p className="input-error">{errors.confirmPassword}</p>}

        {/* ✅ Terms & Conditions */}
        <label className="terms-label">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={e => { setAgreeTerms(e.target.checked); setErrors(prev => ({ ...prev, agreeTerms: "" })) }}
          />
          I agree to the <span className="terms-link" onClick={() => setShowTermsModal(true)}>Terms & Conditions</span>
        </label>
        {errors.agreeTerms && <p className="input-error">{errors.agreeTerms}</p>}

        {/* Register Button */}
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Register"}
        </button>

        <div className="divider"><span>OR</span></div>

        <button
          type="button"
          className="btn google"
          onClick={handleGoogleRegister}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
          />
          Register with Google
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {/* ===== Terms Modal ===== */}
        {showTermsModal && (
          <div className="terms-modal">
            <div className="terms-content">
              <h2>Terms & Conditions</h2>
              <p>Welcome to Tradedamas. By using our platform, you agree to the following terms and conditions. Please read them carefully before proceeding.</p>
              <ul>
                <li>Users must provide accurate information when registering.</li>
                <li>Passwords must be kept secure and not shared with others.</li>
                <li>The platform may update features at any time.</li>
                <li>By using the platform, you accept these terms fully.</li>
              </ul>
              <button className="btn close-btn" onClick={() => setShowTermsModal(false)}>Close</button>
            </div>
          </div>
        )}

        <style>{`
          .name-row { display: flex; gap: 12px; }
          .name-input { flex: 1; display: flex; flex-direction: column; }
          .input-error { color: #ff4d4f; font-size: 12px; margin-top: 4px; margin-bottom: 8px; font-weight: 500; }
          .spinner { width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-top-color: #00ff9c; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; vertical-align: middle; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .terms-label { display: flex; align-items: center; gap: 8px; font-size: 14px; margin-bottom: 12px; cursor: pointer; }
          .terms-link { color: #00ff9c; text-decoration: underline; cursor: pointer; }

          /* ===== Modal CSS ===== */
          .terms-modal {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          .terms-content {
            background: #020617;
            color: white;
            padding: 24px;
            max-width: 300px;
            width: 90%;
            border-radius: 12px;
       
          }
          .terms-content h2 { margin-top: 0; color: #00ff9c; }
          .terms-content ul { padding-left: 20px; margin-top: 12px; }
          .close-btn {
            margin-top: 16px;
            background: #00ff9c;
            color: #020617;
            border: none;
            padding: 10px 16px;
           
            cursor: pointer;
            font-weight: 600;
          }
          .close-btn:hover { background: #00c853; }
        `}</style>
      </form>
    </AuthLayout>
  )
}