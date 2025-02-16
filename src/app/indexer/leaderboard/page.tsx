"use client";

import { PageHeader } from "@/components/PageHeader";
import { Text } from "@radix-ui/themes";

export default function PaymentDemoPage() {
  return (
    <>
      <PageHeader title='Leaderboard' backPath='/indexer' />
      <Text>View top users and statistics</Text>
    </>
  );
}
