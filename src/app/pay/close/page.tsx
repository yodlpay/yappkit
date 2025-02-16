"use client";

import { PageHeader } from "@/components/PageHeader";
import { Text } from "@radix-ui/themes";

export default function TransactionsPage() {
  return (
    <>
      <PageHeader title='Close' backPath='/pay' />
      <Text>Close the iframe</Text>
    </>
  );
}
