"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useUser } from "../../providers/UserProviders";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { FaSink } from "react-icons/fa";
import Link from "next/link";
export function Header() {
  const { userInfo } = useUser();

  return (
    <Flex
      py="3"
      justify="between"
      align="center"
      gap="1"
      className="sticky top-0 z-50"
      style={{ backgroundColor: "var(--gray-1)" }}
    >
      {/* <Image src='/favicon.ico' alt='Kitchensink Logo' width={24} height={24} /> */}
      {/* <Image src='/kitchensink-logo.png' alt='Kitchensink Logo' width={24} height={24} /> */}
      <Link href="/">
        <FaSink color="var(--accent-9)" size={24} />
      </Link>
      <ConnectButton label="Connect" 
      // chainStatus="none" 
      chainStatus="icon" 
      accountStatus="avatar" 
      // accountStatus="full" 
      />
      {/* {userInfo?.truncatedAddress && (
        <Text size='1' color='gray'>
          {userInfo.truncatedAddress}
        </Text>
      )} */}
    </Flex>
  );
}
