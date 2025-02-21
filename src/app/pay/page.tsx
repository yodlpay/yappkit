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
  Badge,
} from "@radix-ui/themes";
import { FaChartLine, FaTrophy } from "react-icons/fa";
import { PageHeader } from "@/components/layout/PageHeader";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { InfoBox } from "@/components/ui/InfoBox";
import { FiatCurrency } from "@yodlpay/yapp-sdk/dist/types/currency";
import { PaymentResponse } from "@yodlpay/yapp-sdk";
import { sdk } from "@/lib/sdk";
import { useState } from "react";
import { SupportedChainId } from "@/types";
import { EXPLORERLINK_BY_CHAINID } from "@/constants";
import { getChain } from "@yodlpay/tokenlists";

// const PAY_SECTIONS = [
//   {
//     title: "Close",
//     description: "How to close iframe and return the main app",
//     icon: FaChartLine,
//     href: "/pay/close",
//   },
//   {
//     title: "Payments",
//     description: "Make payments on yodl.me",
//     icon: FaTrophy,
//     href: "/pay/payments",
//   },
// ] as const;

const CURRENCY_OPTIONS = [
  { label: "USD", value: FiatCurrency.USD },
  { label: "EUR", value: FiatCurrency.EUR },
  { label: "GBP", value: FiatCurrency.GBP },
] as const;

export default function PayPage() {
  const [amount, setAmount] = useState<number>(1);
  const [currency, setCurrency] = useState<FiatCurrency>(FiatCurrency.USD);
  const [receiver, setReceiver] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  const handlePayment = async () => {
    setError(null);

    if (!receiver) {
      setError("Please enter a receiver address");
      return;
    }

    const payload = {
      amount,
      currency,
      memo: "Premium subscription",
    };

    try {
      const response = await sdk.requestPayment(receiver, payload);
      console.log("🚀 response:", response);
      setPaymentResponse(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
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
          <Code>window.postMessage</Code> is the most secure way to communicate between yapps and
          the main app.
        </InfoBox>
      </Section>

      <Section size="1">
        <Flex direction="column" gap="3">
          <Text align="center">Initaite a payment in the Yodl app.</Text>
          <Card>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="3">
                <Flex direction="column" gap="1">
                  <Text size="2">To</Text>
                  <TextField.Root
                    size="2"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Enter receiver address or ENS"
                  />
                </Flex>
                <Flex justify="between">
                  <Flex direction="column" gap="1">
                    <Text size="2">Amount</Text>
                    <TextField.Root
                      size="2"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      placeholder="Enter amount"
                    />
                  </Flex>
                  <Flex direction="column" gap="1">
                    <Text size="2">Currency</Text>
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
                </Flex>

                <Button onClick={handlePayment} size="2">
                  Pay
                </Button>

                {error && (
                  <Text color="red" size="2">
                    {error}
                  </Text>
                )}

                {paymentResponse?.txHash && (
                  <Flex direction="column" gap="1">
                    <Text size="2">
                      Payment on {getChain(paymentResponse.chainId).chainName}{" "} chain
                      <Badge color="green">Successful.</Badge>
                    </Text>
                    <Text size="2">
                      <Link
                        href={`${
                          EXPLORERLINK_BY_CHAINID[paymentResponse.chainId as SupportedChainId]
                        }/${paymentResponse.txHash}`}
                        target="_blank"
                      >
                        View on explorer
                      </Link>
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Section>
    </>
  );
}
