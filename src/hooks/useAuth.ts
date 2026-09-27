"use client";

import { useState, useEffect } from "react";

export interface UserBiometricStatus {
  face: boolean;
  fingerprint: boolean;
  qr: boolean;
  iris: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  dob: string;
  city: string;
  aadharVerified: boolean;
  biometricStatus: UserBiometricStatus;
  registrationComplete: boolean;
}

const DEFAULT_USER: User = {
  id: "USR-001234567",
  email: "harsh@example.com",
  name: "Harsh Yadav",
  phone: "+91-9876543210",
  dob: "2005-05-15",
  city: "Bhopal",
  aadharVerified: true,
  biometricStatus: {
    face: true,
    fingerprint: true,
    qr: true,
    iris: false
  },
  registrationComplete: true
};

const USER_STORAGE_KEY = "evoting_user";
const SESSION_STORAGE_KEY = "evoting_session";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);

      if (storedUser && storedSession === "true") {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        // Initialize default demo user for SIH 2026 showcase if not present
        setUser(DEFAULT_USER);
        setIsAuthenticated(true);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
        localStorage.setItem(SESSION_STORAGE_KEY, "true");
      }
    } catch (err) {
      console.error("Error reading auth state from localStorage:", err);
      setUser(DEFAULT_USER);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = user || DEFAULT_USER;
        const updatedUser = { ...existingUser, email: email || existingUser.email };
        setUser(updatedUser);
        setIsAuthenticated(true);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        localStorage.setItem(SESSION_STORAGE_KEY, "true");
        resolve(true);
      }, 500);
    });
  };

  const signup = (userData: Partial<User>): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `USR-${Math.floor(100000000 + Math.random() * 900000000)}`,
          email: userData.email || "",
          name: userData.name || "New Voter",
          phone: userData.phone || "",
          dob: userData.dob || "",
          city: userData.city || "",
          aadharVerified: false,
          biometricStatus: { face: false, fingerprint: false, qr: false, iris: false },
          registrationComplete: false
        };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        localStorage.setItem(SESSION_STORAGE_KEY, "true");
        resolve(true);
      }, 500);
    });
  };

  const updateUser = (updatedFields: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(SESSION_STORAGE_KEY, "false");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    updateUser,
    logout
  };
}
