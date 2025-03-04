"use client";

import { createContext, useContext, ReactNode, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sdk } from "@/lib/sdk";
import { FullScreenLoader } from "@/components/ui/Loader";
import { Address } from "viem";

type UserInfo = {
  address: Address;
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

      if (jwt) {
        try {
          const payload = await sdk.verify(jwt);

          if (!payload) throw new Error("Invalid JWT payload");

          const newUserInfo = {
            address: payload.sub as Address,
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

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<FullScreenLoader />}>
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
