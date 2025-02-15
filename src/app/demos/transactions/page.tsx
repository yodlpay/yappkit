"use client";

import { Box, Heading, Text } from "@radix-ui/themes";

export default function TransactionsPage() {
  return (
    <Box p='4'>
      <Heading size='4' mb='4'>
        Transactions
      </Heading>
      <Text>View recent transactions for connected address</Text>
    </Box>
  );
}
