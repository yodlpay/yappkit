"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Text } from "@radix-ui/themes";

export default function PaymentsPage() {
  return (
    <>
      <PageHeader title="Payments" backPath="/pay" />
      <Text>Trigger a payment in Yodl UI</Text>
    </>
  );
}
