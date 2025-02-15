"use client";

import { BackButton } from "@/components/BackButton";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";

export default function PaymentDemoPage() {
  return (
    <Box p='4'>
      <Flex width='100%' align='center'>
        <Box className='flex-1'>
          <BackButton path='/demos' />
        </Box>
        <Heading size='4'>Payment Demo</Heading>
        <Box className='flex-1' />
      </Flex>

      <Text>Interface to trigger payments in Yodl UI</Text>
    </Box>
  );
}
