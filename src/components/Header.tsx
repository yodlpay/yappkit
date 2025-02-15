"use client";

import { Flex, Text } from "@radix-ui/themes";
import { useUser } from "../contexts/UserContext";

export function Header() {
  const { userInfo } = useUser();

  return (
    <Flex px='4' py='3' justify='between' align='center' gap='1'>
      <Text size='2' weight='bold'>
        Kitchensink Logo
      </Text>
      {userInfo?.truncatedAddress && (
        <Text size='1' color='gray'>
          {userInfo.truncatedAddress}
        </Text>
      )}
    </Flex>
  );
}
