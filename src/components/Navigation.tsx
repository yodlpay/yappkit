"use client";

import { TabNav, Flex, Text } from "@radix-ui/themes";

import { usePathname } from "next/navigation";
import { FaUserCircle, FaWallet, FaTimes, FaCreditCard, FaChartLine, FaChartBar } from "react-icons/fa";
import { HiServer } from "react-icons/hi";

import Link from "next/link";

const ROUTES = [
  { path: "/", label: "Profile", icon: FaUserCircle },
  { path: "/connect", label: "Connect", icon: FaWallet },
  { path: "/close", label: "Close", icon: FaTimes },
  { path: "/payment", label: "Pay", icon: FaCreditCard },
  { path: "/transactions", label: "History", icon: FaChartLine },
  { path: "/leaderboard", label: "Leaders", icon: FaChartBar },
  { path: "/webhook", label: "Events", icon: HiServer },
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <TabNav.Root size='2'>
      <Flex width='100%' justify='between' py='2'>
        {ROUTES.map(({ path, label, icon: Icon }) => (
          <TabNav.Link
            key={path}
            asChild
            style={{
              color: pathname === path ? "var(--accent-9)" : undefined,
            }}>
            <Link href={path}>
              <Flex direction='column' align='center' gap='1'>
                <Icon size={20} />
                <Text>{label}</Text>
              </Flex>
            </Link>
          </TabNav.Link>
        ))}
      </Flex>
    </TabNav.Root>
  );
}
