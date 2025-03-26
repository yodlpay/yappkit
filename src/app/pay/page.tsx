"use client";

import {
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
  Heading,
} from "@radix-ui/themes";
import { PageHeader } from "@/components/layout/PageHeader";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { InfoBox } from "@/components/ui/InfoBox";
import { FiatCurrency } from "@yodlpay/yapp-sdk/types";
import { Payment } from "@yodlpay/yapp-sdk";
import { sdk } from "@/lib/sdk";
import { useState } from "react";
import { getChain } from "@yodlpay/tokenlists";
import { Address } from "viem";

export default function PayPage() {
  const [amount, setAmount] = useState<number>(1);
  const [currency, setCurrency] = useState<FiatCurrency>(FiatCurrency.USD);
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [paymentResponse, setPaymentResponse] = useState<Payment | null>(null);

  const handlePayment = async () => {
    setError(null);

    if (!receiverAddress) {
      setError("Please enter a receiver address");
      return;
    }

    const payload = {
      amount,
      currency,
    };

    try {
      const response = await sdk.requestPayment(receiverAddress as Address, payload);
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
        <Text as="p" align="center">
          To request a Yodl payment, yapps should use the <Code>requestPayment()</Code> function
          exposed by the yapp SDK.
        </Text>
      </Section>

      <InfoBox>
        <Code>requestPayment</Code> calls <Code>window.postMessage</Code>
        for secure communication between the iframe and the parent.
      </InfoBox>

      <Section size="1">
        <Text as="p" align="center">
          When the Yodl app receives a payment request, the payment modal will be displayed. The
          user can configure payment settings, e.g. outgoing token, and complete or reject the
          payment. After completed payment the modal will close and the yapp receives a response
          with <Code>txHash</Code> and <Code>chainId</Code>. Try it out below.
        </Text>
      </Section>

      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Request a payment
        </Heading>

        <Card size="1">
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="3">
              <Flex direction="column" gap="1">
                <Text size="2">To</Text>
                <TextField.Root
                  size="2"
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value)}
                  placeholder="Enter receiver address"
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
                      {Object.values(FiatCurrency).map((option) => (
                        <Select.Item key={option} value={option}>
                          {option}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Flex>

              <Button
                onClick={handlePayment}
                size="2"
                disabled={!receiverAddress || !amount || !currency}
              >
                Pay
              </Button>

              {error && (
                <Text color="red" size="2">
                  {error}
                </Text>
              )}

              {paymentResponse && (
                <Flex direction="column" gap="1">
                  <Text size="2">
                    Payment on {getChain(paymentResponse.chainId).chainName} chain
                    <Badge color="green">Successful.</Badge>
                  </Text>
                  <Text size="2">
                    <Link
                      href={`${getChain(paymentResponse.chainId).explorerUrl}/${
                        paymentResponse.txHash
                      }`}
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
      </Section>
    </>
  );
}
