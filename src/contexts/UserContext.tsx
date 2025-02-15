"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Address } from "viem";

type UserInfo = {
  fullAddress: Address;
  truncatedAddress: string;
  communityEns: string;
  yappEns: string;
  nonce: number;
} | null;

type UserContextType = {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  useEffect(() => {
    // First check for JWT as it takes precedence
    const jwt = searchParams.get("jwt");

    if (jwt) {
      try {
        const [, payloadBase64] = jwt.split(".");
        const payload = JSON.parse(atob(payloadBase64));

        const newUserInfo = {
          fullAddress: payload.sub,
          truncatedAddress: payload.sub.slice(0, 6) + "..." + payload.sub.slice(-4),
          communityEns: payload.iss,
          yappEns: payload.aud,
          nonce: payload.exp,
        };

        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
        setUserInfo(newUserInfo);
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    } else {
      // Only check localStorage if no valid JWT found
      const saved = localStorage.getItem("userInfo");
      if (saved) {
        setUserInfo(JSON.parse(saved));
      }
    }
    setIsLoading(false);
  }, [searchParams]);

  return <UserContext.Provider value={{ userInfo, setUserInfo, isLoading }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
