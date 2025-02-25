"use client";

import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { PageHeader } from "@/components/layout/PageHeader";
import { Heading, Flex, Section, Text, Code } from "@radix-ui/themes";
import { UserInfoDisplay } from "../userInfoDisplay";
export default function TokenPage() {
  return (
    <>
      <StickyTopBox>
        <PageHeader title="JSON Web Token" backPath="/" />
      </StickyTopBox>

      <Section size="1">
        <Text as="p" align="center">
          Yapps opened through the Yodl app receive a JSON Web Token in the <Code>jwt</Code> query
          parameter.
          <br />
          The token containes verfied details about the user and where they came from.
          <br />
        </Text>
      </Section>

      <Section>
        <Text as="p" align="center">
          Below shows data from the current token. Tab the info icon to learn more about each data
          item.
        </Text>
      </Section>

      <Heading as="h3" size="2" align="center" color="gray">
        Token details
      </Heading>
      <Section size="1" pt="1">
        <UserInfoDisplay />
      </Section>
    </>
  );
}
