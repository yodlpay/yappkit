"use client";

import { PageHeader } from "@/components/PageHeader";
import { sdk } from "@/lib/sdk";
import { Text, Button, Separator } from "@radix-ui/themes";

export default function TransactionsPage() {
  const handleClose = () => {
    // Close the Yapp securely
    sdk.close("https://yodl.me");
  };

  return (
    <>
      <PageHeader title='Close' backPath='/pay' />
      <Text>Close the iframe</Text>
      <Separator />
      <Button onClick={handleClose}>Close</Button>
    </>
  );
}
