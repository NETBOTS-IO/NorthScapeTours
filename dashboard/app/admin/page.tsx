"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Users, Calendar, DollarSign, Package, MessageSquare } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for charts
const revenueData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 19000 },
  { name: "Mar", value: 15000 },
  { name: "Apr", value: 22000 },
  { name: "May", value: 28000 },
  { name: "Jun", value: 32000 },
  { name: "Jul", value: 38000 },
  { name: "Aug", value: 42000 },
  { name: "Sep", value: 45000 },
  { name: "Oct", value: 48000 },
  { name: "Nov", value: 52000 },
  { name: "Dec", value: 58000 },
]

const bookingsData = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 190 },
  { name: "Mar", value: 150 },
  { name: "Apr", value: 220 },
  { name: "May", value: 280 },
  { name: "Jun", value: 320 },
  { name: "Jul", value: 380 },
  { name: "Aug", value: 420 },
  { name: "Sep", value: 450 },
  { name: "Oct", value: 480 },
  { name: "Nov", value: 520 },
  { name: "Dec", value: 580 },
]

const tourCategoryData = [
  { name: "Trekking", value: 45 },
  { name: "Cultural", value: 25 },
  { name: "Adventure", value: 20 },
  { name: "Historical", value: 10 },
]

const COLORS = ["#1E8A95", "#F28C38", "#4F3B9A", "#E63946"]

const recentBookings = [
  { id: 1, customer: "John Smith", tour: "K2 Base Camp Trek", date: "2023-11-15", amount: "$3,500" },
  { id: 2, customer: "Sarah Johnson", tour: "Hunza Valley Explorer", date: "2023-11-14", amount: "$1,800" },
  { id: 3, customer: "Michael Brown", tour: "Fairy Meadows Trek", date: "2023-11-13", amount: "$1,200" },
  { id: 4, customer: "Emily Davis", tour: "Skardu Adventure", date: "2023-11-12", amount: "$2,100" },
  { id: 5, customer: "David Wilson", tour: "Nanga Parbat Base Camp", date: "2023-11-11", amount: "$2,800" },
]

const recentInquiries = [
  { id: 1, name: "Alex Thompson", subject: "K2 Base Camp Trek Inquiry", date: "2023-11-15", status: "New" },
  { id: 2, name: "Jessica Lee", subject: "Custom Tour Request", date: "2023-11-14", status: "In Progress" },
  { id: 3, name: "Robert Clark", subject: "Group Booking Question", date: "2023-11-13", status: "New" },
  { id: 4, name: "Amanda White", subject: "Tour Availability", date: "2023-11-12", status: "Resolved" },
  { id: 5, name: "James Miller", subject: "Pricing Inquiry", date: "2023-11-11", status: "In Progress" },
]

export default function AdminDashboard() {
  const [totalRevenue, setTotalRevenue] = useState("$345,231.89")
  const [totalBookings, setTotalBookings] = useState("2,350")
  const [activeTours, setActiveTours] = useState("24")
  const [customerSatisfaction, setCustomerSatisfaction] = useState("98%")

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}</div>
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
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +18.1% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTours}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +4 <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerSatisfaction}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                +2% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="tours">Tour Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#1E8A95" activeDot={{ r: 8 }} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookings Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, "Bookings"]} />
                  <Legend />
                  <Bar dataKey="value" fill="#F28C38" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tour Categories</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tourCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {tourCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{booking.customer}</p>
                    <p className="text-sm text-muted-foreground">{booking.tour}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{booking.amount}</p>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Recent Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.subject}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        inquiry.status === "New"
                          ? "text-blue-500"
                          : inquiry.status === "In Progress"
                            ? "text-orange-500"
                            : "text-green-500"
                      }`}
                    >
                      {inquiry.status}
                    </p>
                    <p className="text-sm text-muted-foreground">{inquiry.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

