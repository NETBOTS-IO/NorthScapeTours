"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "@/Var";

// Define User type (customize according to your backend user schema)

interface User {
  id: string;
  role: string;
  email: string;
  [key: string]: any;
}

// Define Context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // fetchUser: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  // console.log('user', user)
  // console.log('token', token)
  // console.log('loading', loading)

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/auth/me`, { withCredentials: true });
      setUser(res.data.user);
      setToken(res.data.token);
    } catch (error) {
      setUser(null);
      console.error("error", error);
      toast.error(error.response?.data?.message || "Failed to Authenticate User");
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
    const res =  await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true } 
      );
      setToken(res.data.token);
      setUser(res.data.user);
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      throw error;
    }finally{
      setLoading(false)
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      setToken(null);
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p>Loading...</p>
    </div>
  );
}


  return (
    <AuthContext.Provider value={{ user, loading, login, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
