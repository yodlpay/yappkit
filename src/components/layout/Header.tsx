"use client";

import { Flex, Link } from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <Flex
      py="3"
      justify="between"
      align="center"
      gap="1"
      className="sticky top-0 z-50"
      style={{ backgroundColor: "var(--gray-1)" }}
    >
      <Flex gap="2">
        <Link href="https://github.com/AndyOooh/kitchensink-yapp" target="_blank">
          <FaGithub color="white" size={24} />
        </Link>
      </Flex>
      <ConnectButton label="Connect" chainStatus="icon" accountStatus="avatar" />
    </Flex>
  );
}
