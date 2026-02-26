import { useState } from "react"

export default function Settings() {

  const [activeTab, setActiveTab] = useState("general")

  const [profileImage, setProfileImage] = useState(null)

  const [twoFA, setTwoFA] = useState(false)

  const [form, setForm] = useState({
    name: "John Trader",
    email: "john@example.com",
    timezone: "UTC +2"
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(URL.createObjectURL(file))
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="settings-container">

      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and security.</p>
      </div>

      {/* ===== TABS ===== */}

      <div className="settings-tabs">

        <button
          className={activeTab === "general" ? "active" : ""}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>

        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          className={activeTab === "security" ? "active" : ""}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>

        <button
          className={activeTab === "billing" ? "active" : ""}
          onClick={() => setActiveTab("billing")}
        >
          Billing
        </button>

      </div>


      {/* ================= GENERAL ================= */}

      {activeTab === "general" && (
        <div className="settings-card">

          <h3>General Settings</h3>

          <div className="form-group">
            <label>Timezone</label>
            <select
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
            >
              <option>UTC</option>
              <option>UTC +1</option>
              <option>UTC +2</option>
              <option>UTC +3</option>
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>
            <select>
              <option>English</option>
              <option>Arabic</option>
            </select>
          </div>

          <button className="primary-btn">
            Save Preferences
          </button>

        </div>
      )}


      {/* ================= PROFILE ================= */}

      {activeTab === "profile" && (
        <div className="settings-card">

          <h3>Profile Information</h3>

          <div className="profile-section">

            <div className="avatar-wrapper">
              {profileImage ? (
                <img src={profileImage} alt="avatar" />
              ) : (
                <div className="avatar-placeholder">
                  Upload
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <button className="primary-btn">
            Save Profile
          </button>

        </div>
      )}


      {/* ================= SECURITY ================= */}

      {activeTab === "security" && (
        <div className="settings-card">

          <h3>Security</h3>

          <div className="form-group">
            <label>Current Password</label>
            <input type="password" />
          </div>

          <div className="form-group"><label>New Password</label>
            <input type="password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" />
          </div>

          <button className="primary-btn">
            Update Password
          </button>

          <div className="security-row">

            <div>
              <strong>Two-Factor Authentication</strong>
              <p>Secure your account using phone verification.</p>
            </div>

            <button
              className={`toggle-btn ${twoFA ? "active" : ""}`}
              onClick={() => setTwoFA(!twoFA)}
            >
              {twoFA ? "Enabled" : "Disabled"}
            </button>

          </div>

        </div>
      )}


      {/* ================= BILLING ================= */}

      {activeTab === "billing" && (
        <div className="settings-card">

          <h3>Billing & Subscription</h3>

          <div className="subscription-box">
            <p>Current Plan</p>
            <h2>Pro Plan</h2>
            <span>$29 / month</span>
          </div>

          <button className="primary-btn">
            Manage Subscription
          </button>

        </div>
      )}

    </div>
  )
}