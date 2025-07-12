"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password, role) => {
    // Mock login - in real app, this would call your API
    const mockUser = {
      id: 1,
      name: role === "freelancer" ? "John Doe" : "Jane Smith",
      email: email,
      role: role,
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return mockUser
  }

  const signup = async (userData) => {
    // Mock signup - in real app, this would call your API
    const newUser = {
      id: Date.now(),
      ...userData,
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return newUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
