"use client";

import { Flex, Link } from "@radix-ui/themes";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { CustomConnectButton } from "./CustomConnectButton";

export function Header() {
  return (
    <Flex
      py="4"
      px="4"
      justify="between"
      align="center"
      gap="1"
      className="sticky top-0 z-50 backdrop-blur"
    >
      <Flex gap="4">
        <Link href="https://github.com/yodlpay/yappkit" target="_blank">
          <FaGithub color="white" size={24} />
        </Link>
        <Link href="https://x.com/yodlpay" target="_blank">
          <FaTwitter color="white" size={24} />
        </Link>
      </Flex>
      <CustomConnectButton />
    </Flex>
  );
}
