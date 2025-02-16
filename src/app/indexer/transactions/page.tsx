"use client";

import { PageHeader } from "@/components/PageHeader";
import { Box, Heading, Text } from "@radix-ui/themes";

export default function TransactionsPage() {
  return (
    <>
      <PageHeader title='Transactions' backPath='/indexer' />
      <Text>View recent transactions for connected address</Text>
    </>
  );
}
