// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AdminLayout } from "./admin-layout";
import { AuthProvider } from "@/context/authContext";
import PrivateRoute from "../context/privateRoutes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Northscape - Adventure Tours & Trekking",
  description: "Northscape Pakistan offers adventure tours, trekking expeditions, and cultural experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PrivateRoute>
            <AdminLayout>{children}</AdminLayout>
          </PrivateRoute>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
