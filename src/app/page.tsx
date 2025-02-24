"use client";

import {
  Heading,
  Text,
  Flex,
  Section,
  ChevronDownIcon,
  Card,
  Link,
  Code,
  Callout,
  Em,
  Strong,
} from "@radix-ui/themes";
import { useUser } from "@/providers/UserProviders";
import { Loader } from "@/components/ui/Loader";
import { InfoBox } from "@/components/ui/InfoBox";
import { UserInfoDisplay } from "./userInfoDisplay";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { PageHeader } from "@/components/layout/PageHeader";

export default function ProfilePage() {
  const { userInfo, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  if (!userInfo) {
    return (
      <Flex direction="column" gap="4" justify="center" align="center">
        <Section p="4">
          <Heading size="4">User info could not be loaded</Heading>
        </Section>
        <Section p="4">
          <Callout.Root color="red">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>Make sure you open the app via the Yodl app.</Callout.Text>
          </Callout.Root>
        </Section>
      </Flex>
    );
  }

  const faq = [
    {
      key: "qestion-1",
      question: "What is a Yapp?",
      answer: "A Yapp is an app that implements the Yodl protocol.",
    },
    {
      key: "qestion-2",
      question: "What is Kitchen Sink?",
      answer: "Kitchen Sink is a demo Yapp.",
    },
    {
      key: "qestion-4",
      question: "How to request Yodl payments?",
      content: (
        <Text>
          Use the <Code>requestPayment()</Code> function from the yapp SDK.{" "}
          <Link href="/pay">Try it out</Link>.
        </Text>
      ),
    },
    {
      key: "qestion-3",
      question: "What about wallet connection?",
      content: (
        <Text>
          To send on-chain transactions besides Yodl payments, yapps must implement their own wallet
          connection. <Link href="/connect">Learn more</Link>.
        </Text>
      ),
    },
  ];

  return (
    <>
      <StickyTopBox>
        <PageHeader title="Welcome to Kitchen Sink" />
      </StickyTopBox>

      <Section size="1">
        <Text as="p" size="2" align="center">
          Learn to build yapps by exploring the core features of this demo yapp or clone the repo.
        </Text>
      </Section>

      {/* <Text as="p" size="2" align="center">
        Learn to build yapps
        <br />
        Explore core features by navigating the app
        <br />
        Clone the repo and use it as a template
      </Text> */}

      <Section size="1">
        <Text as="p" size="2" align="center">
          Yapps opened through the Yodl app receive the <Code>jwt</Code> query parameter. This is a{" "}
          <Strong>JSON Web Token</Strong> with verified details about the user and where they come
          from.
        </Text>
      </Section>

      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Your details
        </Heading>
        <UserInfoDisplay />
      </Section>

      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          FAQ
        </Heading>
        {/* <Accordion.Root type="single" collapsible className="text-sm"> */}
        <Accordion.Root type="multiple" className="text-sm">
          <Flex direction="column" gap="2">
            {faq.map(({ key, question, answer, content }, idx) => (
              <Card key={key} size="1">
                <Accordion.Item value={key} key={key} className="w-full">
                  <Flex direction="column" gap="2">
                    <Accordion.Header>
                      <Accordion.Trigger className="group w-full">
                        <Flex justify="between" align="center" gap="2">
                          <Text>{question}</Text>
                          <ChevronDownIcon
                            className="group-data-[state=open]:rotate-180"
                            aria-hidden
                          />
                        </Flex>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <Text as="p" size="2" color="gray">
                        {content || answer}
                      </Text>
                      {/* <Callout.Root size="2" color={idx % 2 === 0 ? "gray" : "teal"}>
                        <Callout.Text>{content || answer}</Callout.Text>
                      </Callout.Root> */}
                    </Accordion.Content>
                  </Flex>
                </Accordion.Item>
              </Card>
            ))}
          </Flex>
        </Accordion.Root>
      </Section>
    </>
  );
}
