"use client";

import {
  Box,
  Card,
  Flex,
  Link,
  Text,
  Section,
  Code,
  Button,
  TextField,
  Select,
} from "@radix-ui/themes";
import { FaChartLine, FaTrophy } from "react-icons/fa";
import { PageHeader } from "@/components/layout/PageHeader";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { InfoBox } from "@/components/ui/InfoBox";
import { FiatCurrency } from "@yodlpay/yapp-sdk/dist/types/currency";
import { sdk } from "@/lib/sdk";
import { useState } from "react";

const PAY_SECTIONS = [
  {
    title: "Close",
    description: "How to close iframe and return the main app",
    icon: FaChartLine,
    href: "/pay/close",
  },
  {
    title: "Payments",
    description: "Make payments on yodl.me",
    icon: FaTrophy,
    href: "/pay/payments",
  },
] as const;

const CURRENCY_OPTIONS = [
  { label: "USD", value: FiatCurrency.USD },
  { label: "EUR", value: FiatCurrency.EUR },
  { label: "GBP", value: FiatCurrency.GBP },
] as const;

export default function PayPage() {
  const [amount, setAmount] = useState<number>(1);
  const [currency, setCurrency] = useState<FiatCurrency>(FiatCurrency.USD);

  const handlePayment = async () => {
    const payload = {
      amount,
      currency,
      memo: "Premium subscription",
    };

    // const receiver = "andy.yodl.me";
    // const receiver = "0x58A04F7D5831590F09145885eB16fDF46dB1445C";
    const receiver = "0x250189C0Af7c0f4CD7871c9a20826eAee4c0a50c";

    try {
      const response = await sdk.requestPayment(receiver, payload);
      console.log("Transaction hash:", response.txHash);
      console.log("Chain ID:", response.chainId);
    } catch (error: any) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <>
      <StickyTopBox>
        <PageHeader title="Pay" backPath="/" />
      </StickyTopBox>

      <Section size="1">
        <Flex direction="column" gap="2" justify="center">
          <Text align="center">
            Yodl payments in yapps are handled by the yapp-sdk. Yapps send a{" "}
            <Code>postMessage()</Code> to the parent window with the payment details.
          </Text>
        </Flex>
      </Section>

      <Section size="1">
        <InfoBox>
          <Code>window.postMessage</Code> is the most secure way to communicate between yapps and the main app.
        </InfoBox>
      </Section>

      <Section size="1">
        <Card>
          <Flex direction="column" gap="2" align="start" width="100%">
            <Flex gap="1" width="100%">
              <TextField.Root
                size="2"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
              />
              <Select.Root
                value={currency}
                onValueChange={(value) => setCurrency(value as FiatCurrency)}
              >
                <Select.Trigger />
                <Select.Content>
                  {CURRENCY_OPTIONS.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            <Button onClick={handlePayment} size="2">
              Pay
            </Button>
          </Flex>
        </Card>
      </Section>
    </>
  );
}
