"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { CodeCopy } from "@/components/ui/CodeCopy";
import { InfoBox } from "@/components/ui/InfoBox";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
// import { Accordion } from '@radix-ui/react-accordion';
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  Link,
  ScrollArea,
  RadioGroup,
  TextField,
  Section,
  Code,
} from "@radix-ui/themes";
import { useState } from "react";

type WebhookType = "generate" | "custom";

const webhookTypes: { label: string; value: WebhookType }[] = [
  {
    label: "Generate",
    value: "generate",
  },
  {
    label: "Custom",
    value: "custom",
  },
];

export default function WebhooksPage() {
  const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
  const [webhookVisitUrl, setWebhookVisitUrl] = useState<string | null>(null);
  const [webhookType, setWebhookType] = useState<WebhookType>("generate");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateUrl = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/webhook-token", {
        method: "POST",
      });
      const data = await response.json();
      console.log("🚀 data:", data);
      setWebhookUrl(`https://webhook.site/${data.uuid}`);
      setWebhookVisitUrl(`https://webhook.site/#!/view/${data.uuid}`);
    } catch (error) {
      console.error("Failed to generate webhook URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const justanameSteps = [
    "Select your currenct ENS",
    "Click on your account in the top right",
    "Click 'Profile' --> 'Edit Profile' --> 'Custom'",
    "Create a new 'yodl.me' record with the below string or append to the existing one",
    "Go 'Back' and 'Save'",
  ];

  const steps = [
    {
      key: "step-1",
      header: "Step 1: Prepare webhook url",
      content: (
        <Flex direction="column" gap="2">
          <Text size="2">
            Bring your custom endpoint (POST) or generate one to receive webhooks.
          </Text>

          <RadioGroup.Root
            size="1"
            defaultValue="generate"
            onValueChange={(value) => setWebhookType(value as WebhookType)}
          >
            <Flex gap="4">
              {webhookTypes.map((type) => (
                <Text as="label" size="2" key={type.value}>
                  <Flex gap="2">
                    <RadioGroup.Item value={type.value} /> {type.label}
                  </Flex>
                </Text>
              ))}
            </Flex>
          </RadioGroup.Root>

          {webhookType === "generate" ? (
            <Button onClick={handleGenerateUrl} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate URL"}
            </Button>
          ) : (
            <TextField.Root
              placeholder="https://your-endpoint.com/webhook"
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          )}

          {webhookUrl && (
            <Flex direction="column" gap="2">
              <ScrollArea scrollbars="horizontal" className="text-xs py-1">
                <CodeCopy text={webhookUrl} position="back" justify="start" />
              </ScrollArea>
              {webhookType === "generate" && (
                <Link size="2" href={webhookVisitUrl!} target="_blank">
                  Visit webhook
                </Link>
              )}
            </Flex>
          )}
        </Flex>
      ),
    },
    {
      key: "step-2",
      header: "Step 2: Configure ENS Record",
      content: (
        <Flex direction="column" gap="2">
          <Flex gap="2">
            <Text size="2">1.</Text>
            <Text size="2">
              Go to{" "}
              <Link href="https://app.justaname.id/" target="_blank">
                JustaName
              </Link>{" "}
              and connect with your current wallet
            </Text>
          </Flex>
          {justanameSteps.map((step, idx) => (
            <Flex key={step} gap="2">
              <Text size="2">{idx + 2}.</Text>
              <Text size="2">{step}.</Text>
            </Flex>
          ))}
          {webhookUrl ? (
            <ScrollArea scrollbars="horizontal" className="text-xs py-1">
              <CodeCopy text={`"webhooks": ["${webhookUrl}"]`} position="back" justify="start" />
            </ScrollArea>
          ) : (
            <InfoBox color="gray">
              <Text>Generate a URL to get the yodl.me record</Text>
            </InfoBox>
          )}
        </Flex>
      ),
    },
    {
      key: "step-3",
      header: "Step 3: Receive and inspect",
      content: (
        <>
          <Flex gap="2">
            <Text size="2">1.</Text>
            <Text size="2">You are now set up to receive notifications.</Text>
          </Flex>
          <Flex gap="2">
            <Text size="2">2.</Text>
            <Text size="2">
              Send yourself a payment to test it <Link href="./pay">here</Link>.
            </Text>
          </Flex>
          <Flex gap="2">
            <Text size="2">3.</Text>
            <Text size="2">
              Inspect the webhook notification
              {webhookType === "generate" && (
                <Link href={webhookVisitUrl!} target="_blank">
                  {" "}
                  here
                </Link>
              )}
              .
            </Text>
          </Flex>
        </>
      ),
    },
  ];

  return (
    <>
      <StickyTopBox>
        <PageHeader title="Webhooks" backPath="/" />
      </StickyTopBox>
      {/* <Flex direction="column" gap="4">
       */}
      <Section size="1">
        <Text as="p" align="center" size="3" className="text-center">
          Receive payments notifications via webhooks.
          <br />
          Configure the <Code>yodl.me</Code> ENS record with webhook URLs.
        </Text>
      </Section>

      <Section size="1">
        <InfoBox>
          Communities, yapps and users can set their own webhook URLs.
        </InfoBox>
      </Section>

      <Section size="1">
      <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Get Started
        </Heading>
        <Accordion.Root type="single" collapsible className="text-sm">
          <Flex direction="column" gap="2">
            {steps.map((step) => (
              <Card key={step.header}>
                <Accordion.Item value={step.header} className="w-full">
                  <Flex direction="column" gap="2">
                    <Accordion.Header>
                      <Accordion.Trigger className="group w-full">
                        <Flex justify="between" align="center" gap="2">
                          {/* <Text>Step 1: Prepare webhook url</Text> */}
                          <Heading as="h3" size="2">
                            {step.header}
                          </Heading>
                          <ChevronDownIcon
                            className="group-data-[state=open]:rotate-180"
                            aria-hidden
                          />
                        </Flex>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>{step.content} </Accordion.Content>
                  </Flex>
                </Accordion.Item>
              </Card>
            ))}

            {/* <Card>
              <Flex direction="column" gap="2">
                <Heading as="h3" size="3">
                  Step 2: Configure ENS Record
                </Heading>
                <Text>
                  <Flex gap="2">
                    <Text size="2">1.</Text>
                    <Text size="2">
                      Go to{" "}
                      <Link href="https://app.justaname.id/" target="_blank">
                        JustaName
                      </Link>{" "}
                      and connect with your current wallet
                    </Text>
                  </Flex>
                </Text>
                {justanameSteps.map((step, idx) => (
                  <Flex key={step} gap="2">
                    <Text size="2">{idx + 2}.</Text>
                    <Text size="2">{step}.</Text>
                  </Flex>
                ))}
                {webhookUrl ? (
                  <ScrollArea scrollbars="horizontal" className="text-xs py-1">
                    <CodeCopy
                      text={`"webhooks": ["${webhookUrl}"]`}
                      position="back"
                      justify="start"
                    />
                  </ScrollArea>
                ) : (
                  <InfoBox color="gray">
                    <Text>Generate a URL to get the yodl.me record</Text>
                  </InfoBox>
                )}
              </Flex>
            </Card>

            <Card>
              <Flex direction="column" gap="2">
                <Heading as="h3" size="3">
                  Step 3: Receive and inspect notifications
                </Heading>
                <Flex gap="2">
                  <Text size="2">1.</Text>
                  <Text size="2">You are now set up to receive notifications.</Text>
                </Flex>
                <Flex gap="2">
                  <Text size="2">2.</Text>
                  <Text size="2">
                    Send yourself a payment to test it <Link href="./pay">here</Link>.
                  </Text>
                </Flex>
                <Flex gap="2">
                  <Text size="2">3.</Text>
                  <Text size="2">
                    Inspect the webhook notification
                    {webhookType === "generate" && (
                      <Link href={webhookVisitUrl!} target="_blank">
                        {" "}
                        here
                      </Link>
                    )}
                    .
                  </Text>
                </Flex>
              </Flex>
            </Card> */}
          </Flex>
        </Accordion.Root>
      </Section>
    </>
  );
}
