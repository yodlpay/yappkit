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
  Box,
} from "@radix-ui/themes";
import { useUser } from "@/providers/UserProviders";
import { Loader } from "@/components/ui/Loader";
import { InfoBox } from "@/components/ui/InfoBox";
import { UserInfoDisplay } from "./userInfoDisplay";
import { CheckCircledIcon, DotFilledIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { PageHeader } from "@/components/layout/PageHeader";
import { accentColor } from "@/constants";

export default function ProfilePage() {
  const { userInfo, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  const useCases = [
    {
      key: "use-case-1",
      text: "Learn how to build yapps with examples",
    },
    {
      key: "use-case-2",
      text: "Explore core features by navigating the app",
    },
    {
      key: "use-case-3",
      text: "Clone the repo and use it as reference",
    },
  ];

  const faq = [
    {
      key: "qestion-1",
      question: "What is a Yapp?",
      answer: "A Yapp is an app that implements the Yodl protocol.",
    },
    // {
    //   key: "qestion-2",
    //   question: "What is Kitchen Sink?",
    //   answer: "Kitchen Sink is a demo Yapp.",
    // },
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

  return (
    <>
      <StickyTopBox>
        <PageHeader title="Welcome to Kitchen Sink" />
      </StickyTopBox>

      {/* <InfoBox>This yapp is maintained by the Yodl team.</InfoBox> */}
      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Intro
        </Heading>

        <Flex direction="column" gap="2">
          <Text as="p" size="2" align="center" mb="2">
            Kitchen Sink is the demo app for yapp builders. It showcases the core features of the
            Yodl yapp SDK.
          </Text>

          <Card size="1">
            {useCases.map(({ key, text }) => (
              <Flex width="100%" align="center" gap="2" className="font-bold" key={key}>
                <DotFilledIcon color={accentColor} />
                <Text size="2" className="flex-1">
                  {text}
                </Text>
              </Flex>
            ))}
          </Card>
        </Flex>
      </Section>

      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Token
        </Heading>
        <Flex direction="column" gap="2">
          <Text as="p" size="2" align="center">
            Yapps opened through the Yodl app receive a JSON Web Token in the <Code>jwt</Code> query
            parameter.
            <br />
            The token containes verfied details about the user and where they came from.
          </Text>

          <UserInfoDisplay />
        </Flex>
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
