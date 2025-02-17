"use client";

import Link from "next/link";
import { TabNav, Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { TbWebhook } from "react-icons/tb";
import { FaWallet, FaCreditCard, FaChartBar, FaHome } from "react-icons/fa";

const ROUTES = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/connect", label: "Connect", icon: FaWallet },
  { path: "/pay", label: "Pay", icon: FaCreditCard },
  { path: "/indexer", label: "Indexer", icon: FaChartBar },
  { path: "/webhooks", label: "Webhook", icon: TbWebhook },
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <TabNav.Root size='2' style={{ backgroundColor: "var(--gray-1)" }}>
      <Flex width='100%' justify='between' py='2'>
        {ROUTES.map(({ path, label, icon: Icon }) => (
          <TabNav.Link
            key={path}
            asChild
            style={{
              color: path === pathname || (path !== "/" && pathname.startsWith(path)) ? "var(--accent-9)" : undefined,
            }}>
            <Link href={path}>
              <Flex direction='column' align='center'>
                <Icon size={24} />
                {/* <Text>{label}</Text> */}
              </Flex>
            </Link>
          </TabNav.Link>
        ))}
      </Flex>
    </TabNav.Root>
  );
}
