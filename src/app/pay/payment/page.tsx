"use client";

import { PageHeader } from "@/components/PageHeader";
import { Text } from "@radix-ui/themes";

export default function TransactionsPage() {
  return (
    <>
      <PageHeader title='Payment' backPath='/pay' />
      <Text>Trigger a payment in Yodl UI</Text>
    </>
  );
}
