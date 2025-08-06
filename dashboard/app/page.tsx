"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, Calendar, DollarSign, TrendingUp } from "lucide-react"
import OrganizationSchema from "@/components/OrganizationSchema"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin")
  }, [router])

  return (
    <>
      <OrganizationSchema />
    </>
  )
}

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary">Dashboard Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Total Revenue</CardTitle>
            <p className="text-primary">Hello</p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +20.1% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +180.1% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Active Tours</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +19% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-primary">
            <CardTitle className="text-sm font-medium ">Customer Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +5% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

