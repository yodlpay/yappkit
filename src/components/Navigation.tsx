"use client";

import { TabNav, Flex, Text, Box } from "@radix-ui/themes";

import { usePathname } from "next/navigation";
import { FaUserCircle, FaWallet, FaTimes, FaCreditCard, FaChartLine, FaChartBar, FaHome } from "react-icons/fa";
import { HiServer } from "react-icons/hi";

import Link from "next/link";
import { TbWebhook } from "react-icons/tb";
import { MdWebhook } from "react-icons/md";

const ROUTES = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/connect", label: "Connect", icon: FaWallet },
  { path: "/pay", label: "Pay", icon: FaCreditCard },
  { path: "/indexer", label: "Indexer", icon: FaChartBar },
  { path: "/webhook", label: "Webhook", icon: TbWebhook },
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <Box style={{ backgroundColor: "var(--gray-1)" }}>
      <TabNav.Root size='2'>
        <Flex width='100%' justify='between' py='2'>
          {ROUTES.map(({ path, label, icon: Icon }) => (
            <TabNav.Link
              key={path}
              asChild
              style={{
                color: path === pathname || (path !== "/" && pathname.startsWith(path)) ? "var(--accent-9)" : undefined,
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
    </Box>
  );
}
