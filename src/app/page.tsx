"use client";

import { Heading, Text, Flex, Section, ChevronDownIcon, Card, Link, Code } from "@radix-ui/themes";
import { InfoBox } from "@/components/ui/InfoBox";
import * as Accordion from "@radix-ui/react-accordion";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardList } from "@/components/ui/CardList";

const USE_CASES = [
  {
    title: "Learn",
    text: "Learn to build yapps with examples",
  },
  {
    title: "Explore",
    text: "Explore features by navigating the app",
  },
  {
    title: "Clone",
    text: "Clone the repo and use it as reference",
  },
];

const FAQ_ITEMS = [
  {
    key: "question-1",
    question: "What is a Yapp?",
    answer: "A Yapp is an app that implements the Yodl protocol.",
  },
  {
    key: "question-4",
    question: "How to request Yodl payments?",
    content: (
      <Text>
        Use the <Code>requestPayment()</Code> function from the yapp SDK.{" "}
        <Link href="/pay">Try it out</Link>.
      </Text>
    ),
  },
  {
    key: "question-3",
    question: "What about wallet connection?",
    content: (
      <Text>
        To send on-chain transactions besides Yodl payments, yapps must implement their own wallet
        connection. <Link href="/connect">Learn more</Link>.
      </Text>
    ),
  },
];

export default function ProfilePage() {
  return (
    <>
      <StickyTopBox>
        <PageHeader title="Welcome to Kitchen Sink" />
      </StickyTopBox>

      <InfoBox>This yapp is maintained by the Yodl team.</InfoBox>
      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Intro
        </Heading>

        <Flex direction="column" gap="2">
          <Text as="p" align="center">
            Kitchen Sink is the demo app for yapp builders.
            <br />
            It showcases the core building blocks of yapp creation including the yapp SDK, Indexer
            API, webhooks and payments. This is done through examples and explanations. Use it to:
          </Text>
          <CardList list={USE_CASES} />
        </Flex>
      </Section>

      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          FAQ
        </Heading>
        <Accordion.Root type="multiple" className="text-sm">
          <Flex direction="column" gap="2">
            {FAQ_ITEMS.map(({ key, question, answer, content }) => (
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
