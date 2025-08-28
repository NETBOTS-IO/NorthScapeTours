"use client"

import axios from "axios"
import toast from "react-hot-toast"


export async function isAuthenticated() {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/me", {
      withCredentials: true, // important when using httpOnly cookies
    })
    return response.data // return user data if authenticated
  } catch (error) {
    console.error("Error while authenticating:", error)
    return null // not authenticated
  }
}


//api integrated 
export async function logout() {
  try {
   const response = await axios.post("http://localhost:5000/api/auth/logout")
   toast.success(response?.data?.message)
  } catch (error) {
    console.log('error during logout', error)
  }
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

