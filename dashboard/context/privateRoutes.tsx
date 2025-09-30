"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || !token) {
        router.replace("/login"); 
      }
    }
  }, [loading, user, token, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Checking authentication...
      </div>
    );
  }

  if (!user || !token) {
    return null; 
  }

  return <>{children}</>;
}
