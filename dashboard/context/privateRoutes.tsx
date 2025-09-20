// context/PrivateRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const { user, token, loading } = useAuth();
// console.log('private route', user, token, loading)
  useEffect(() => {
    if (!loading && (!user || !token)) {
      router.replace("/login");
    }
  }, [loading, user, token, router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
}
