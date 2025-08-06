"use client"

// Simple authentication utilities
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("mtp_auth") !== null
}

export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("mtp_auth")
}

export function login(email: string, password: string): boolean {
  // For demo purposes, we'll accept any email/password
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "mtp_auth",
      JSON.stringify({
        userId: "1",
        role: "admin",
      }),
    )
    return true
  }
  return false
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false
  const auth = localStorage.getItem("mtp_auth")
  if (!auth) return false

  try {
    const parsed = JSON.parse(auth)
    return parsed.role === "admin"
  } catch (e) {
    return false
  }
}

