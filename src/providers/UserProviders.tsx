"use client";

import { createContext, useContext, ReactNode, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sdk } from "@/lib/sdk";
import { Loader } from "@/components/Loader";

type UserInfo = {
  address: string;
  truncatedAddress: string;
  ens: string | null;
  communityEns: string;
  yappEns: string;
  exp: number;
  someClaim: any;
} | null;

type UserContextType = {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProviderInner({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  useEffect(() => {
    const verifyJWT = async () => {
      const jwt = searchParams.get("jwt");
      console.log("🚀  jwt:", jwt);

      if (jwt) {
        try {
          // const { sdk } = await import("@/lib/sdk"); // Dynamic import
          const payload = await sdk.verify(jwt);
          console.log("🚀  payload:", payload);

          if (!payload) throw new Error("Invalid JWT payload");

          const newUserInfo = {
            address: payload.sub,
            truncatedAddress: payload.sub.slice(0, 6) + "..." + payload.sub.slice(-4),
            ens: payload.ens,
            communityEns: payload.iss,
            yappEns: payload.aud,
            exp: payload.exp,
            someClaim: payload["some-claim"],
          };

          localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
          setUserInfo(newUserInfo);
        } catch (error) {
          console.error("Failed to verify JWT:", error);
          const saved = localStorage.getItem("userInfo");
          if (saved) {
            setUserInfo(JSON.parse(saved));
          }
        }
      } else {
        const saved = localStorage.getItem("userInfo");
        if (saved) {
          setUserInfo(JSON.parse(saved));
        }
      }
      setIsLoading(false);
    };

    verifyJWT();
  }, [searchParams]);

  return <UserContext.Provider value={{ userInfo, setUserInfo, isLoading }}>{children}</UserContext.Provider>;
}

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <UserProviderInner>{children}</UserProviderInner>
    </Suspense>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
