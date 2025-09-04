"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  PackageSearch,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  Camera,
  CarFront,
  MapPinHouse,
  BookOpenCheck,
  NotebookPen,
  Users 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "../context/authContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: PackageSearch, label: "Tour Packages", href: "/admin/tours" },
  { icon: NotebookPen , label: "Bookings", href: "/admin/booking" },
  { icon: NotebookPen , label: "Tour Bookings", href: "/admin/tour-booking" },
  { icon: Camera, label: "Gallery", href: "/admin/gallery" },
  { icon: CarFront , label: "Car Rental", href: "/admin/rent" },
  { icon: MapPinHouse , label: "Destination", href: "/admin/destinations" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: BookOpenCheck , label: "Testimonials", href: "/admin/testimonials" },
  { icon: Users  , label: "Users", href: "/admin/user" },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/inquiries" },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter();
  
  const {  logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (pathname === "/login") {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Admin Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16",
        )}
      >
        {/* Sidebar content */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link
            href="/admin"
            className={cn(
              "text-2xl font-bold text-primary transition-opacity",
              sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden",
            )}
          >
            NS-TAT Admin
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="flex-shrink-0">
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col h-[calc(100vh-4rem)] justify-between">
          <div className="flex-1 py-4 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 mx-2 rounded-lg transition-colors",
                  // "hover:bg-orange-100 hover:text-orange-600",
                  pathname === item.href 
                                    ? " text-primary font-semibold"   // primary background, white text
                                   : "text-black",
                  !sidebarOpen && "justify-center px-2 mx-1",
                )}
              >
                <item.icon className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className={cn("w-full justify-center", !sidebarOpen && "p-2", "text-primary ", 'border-t border-primary')}
              onClick={handleLogout}
            >
              <LogOut className={cn("h-5 w-5", sidebarOpen && "mr-2")} />
              {sidebarOpen && "Logout"}
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={cn("flex flex-col flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
        <header className="sticky top-0 z-40 h-16 bg-white border-b flex items-center px-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4 md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <footer className="sticky bottom-0 z-40 px-6 h-16 bg-white border-t flex items-center justify-around">
          <p className="text-sm text-primary">© {new Date().getFullYear()} Northscape Tours and Travels. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-1">
            Design and developed by{" "}
            <a href="https://netbots.io" target="_blank" className="text-primary hover:underline">
              Netbots (SMC-Private) Limited
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default AdminLayout

