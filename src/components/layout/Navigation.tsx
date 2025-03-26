"use client";

import Link from "next/link";
import { TabNav, Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { TbWebhook } from "react-icons/tb";
import { FaCreditCard, FaHome, FaUser } from "react-icons/fa";
import { LuToyBrick } from "react-icons/lu";
import { SiHiveBlockchain } from "react-icons/si";

const ROUTES = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/user", label: "User", icon: FaUser },
  { path: "/connect", label: "Connect", icon: SiHiveBlockchain },
  { path: "/pay", label: "Pay", icon: FaCreditCard },
  { path: "/indexer", label: "Indexer", icon: LuToyBrick },
  { path: "/webhooks", label: "Webhook", icon: TbWebhook },
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <TabNav.Root size="1">
      <Flex width="100%" justify="between" p="4">
        {ROUTES.map(({ path, icon: Icon }) => (
          <TabNav.Link
            key={path}
            asChild
            style={{
              color:
                path === pathname || (path !== "/" && pathname.startsWith(path))
                  ? "var(--accent-9)"
                  : undefined,
            }}
          >
            <Link href={path}>
              <Flex direction="column" align="center">
                <Icon size={24} />
              </Flex>
            </Link>
          </TabNav.Link>
        ))}
      </Flex>
    </TabNav.Root>
  );
}
