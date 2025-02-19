"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Section,
  ChevronDownIcon,
  Card,
  Link,
  Code,
} from "@radix-ui/themes";
import { useUser } from "@/providers/UserProviders";
import { Loader } from "@/components/Loader";
import { InfoBox } from "@/components/InfoBox";
import { UserInfoDisplay } from "./userInfoDisplay";
import * as Accordion from "@radix-ui/react-accordion";

export default function ProfilePage() {
  const { userInfo, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  if (!userInfo) {
    return (
      <Box p="4">
        <Heading size="4">User info could not be loaded</Heading>
        <Heading as="h2" color="gray">
          Make sure you open the app via the Yodl app.
        </Heading>
      </Box>
    );
  }

  const faq = [
    {
      key: "qestion-1",
      question: "What is a Yapp?",
      answer: "A Yapp is an app that implements the Yodl protocol",
    },
    {
      key: "qestion-2",
      question: "What is Kitchen Sink?",
      answer: "Kitchen Sink is a demo Yapp",
    },
    {
      key: "qestion-3",
      question: "What about wallet connection?",
      answer:
        "Yapps can use the Yodl UI for sending funds. For other transactions, they must implement their own connection logic",
      content: (
        <Text>
          Yapps can use the Yodl UI for sending funds. For other transactions, they must implement
          their own connection logic. <Link href="/connect">Try it out</Link>
        </Text>
      ),
    },
    {
      key: "qestion-4",
      question: "How to send Yodl transactions?",
      answer:
        "Use postMessage() for sending transactions to the parent window. More details in the yapp-sdk docs",
      content: (
        <Text>
          Use <Code>postMessage()</Code> to send transactions details to the Yodl app.{" "}
          <Link href="/pay">Try it out</Link>
        </Text>
      ),
    },
  ];

  return (
    <>
      <Section size="1">
        <Heading size="4" align="center">
          Welcome to Kitchen Sink
        </Heading>
        <Heading as="h2" size="2" align="center" color="gray">
          The all-in-one Yapp
        </Heading>
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
        <Accordion.Root type="single" collapsible className="text-sm">
          <Flex direction="column" gap="2">
            {faq.map(({ key, question, answer, content }) => (
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
                      <InfoBox>{content || answer}</InfoBox>
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
