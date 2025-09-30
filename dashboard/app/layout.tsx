"use client"
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authContext";
import PrivateRoute from "@/context/privateRoutes";
import { AdminLayout } from "./admin-layout";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Northscape Pakistan | Adventure Tours & Trekking",
//   description: "Northscape Pakistan offers adventure tours, trekking expeditions, and cultural experiences.",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {isAdminRoute ? (
            <PrivateRoute>
              <AdminLayout>{children}</AdminLayout>
            </PrivateRoute>
          ) : (
            children
          )}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
