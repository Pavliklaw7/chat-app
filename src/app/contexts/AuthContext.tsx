"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IUser } from "@/app/models/User";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/validate", {
            credentials: "include"
        });

        if (!res.ok) {
            router.replace('/')
        }
        
        const data = await res.json();

        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router, user]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
