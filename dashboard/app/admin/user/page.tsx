"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Lock, ShieldCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BASE_URL } from "@/Var";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [forgotData, setForgotData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
        withCredentials: true
      })
      toast.success("Registration successful! Please login.")
      // router.push("/login")
      console.log('response', response);
      if (response.success) {
        toast.success(response?.data?.message)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed")
    } finally {
      setIsSubmitting(false)
    }
  }



  const handleForgotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotData({ ...forgotData, [e.target.name]: e.target.value })
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}/api/auth/forgot-password`, forgotData, {withCredentials: true})
      toast.success("Password updated successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update password")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="register" className="w-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="forgot">Forgot Password</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <Label htmlFor="username">
                  <User className="inline w-4 h-4 mr-2" /> User Name
                </Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">
                  <Mail className="inline w-4 h-4 mr-2" /> Email
                </Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">
                  <Lock className="inline w-4 h-4 mr-2" /> Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword"><ShieldCheck className="inline w-4 h-4 mr-2" />Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter confirm password"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Register Now"}
              </Button>
            </form>

          </TabsContent>
          {/* Forgot Password (Change Password Form) */}
          <TabsContent value="forgot">
            <form onSubmit={handleForgotPassword} className="space-y-6 mt-4">
              <div>
                <Label htmlFor="email">
                  <Mail className="inline w-4 h-4 mr-2" /> Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={forgotData.email}
                  onChange={handleForgotChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="oldPassword">
                  <Lock className="inline w-4 h-4 mr-2" /> Old Password
                </Label>
                <Input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={forgotData.oldPassword}
                  onChange={handleForgotChange}
                  placeholder="Enter old password"
                  required
                />
              </div>

              <div>
                <Label htmlFor="newPassword">
                  <ShieldCheck className="inline w-4 h-4 mr-2" /> New Password
                </Label>
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={forgotData.newPassword}
                  onChange={handleForgotChange}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
