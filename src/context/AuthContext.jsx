import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // تحميل المستخدم من localStorage عند بدء التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  // تسجيل الدخول
  const login = (email) => {
    localStorage.setItem("user", email)
    setUser(email)
  }

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook جاهز للاستخدام
export function useAuth() {
  return useContext(AuthContext)
}