"use client";

import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { PageHeader } from "@/components/layout/PageHeader";
import { Heading, Section, Text } from "@radix-ui/themes";
import { UserInfoDisplay } from "./components/userInfoDisplay";

export default function UserPage() {
  return (
    <>
      <StickyTopBox>
        <PageHeader title="User Context" backPath="/" />
      </StickyTopBox>

      <Section size="1">
        <Text as="p" align="center">
          Yapps opened through the Yodl app can utilize the yapp-sdk to access user context.
          <br />
          The context includes details of the user and the optionally the community they came from.
          <br />
        </Text>
      </Section>

      <Section>
        <Text as="p" align="center">
          Below table shows details about the current user context. Tab the info icon to learn more
          about each data item.
        </Text>
      </Section>

      <Heading as="h3" size="2" align="center" color="gray">
        User context
      </Heading>
      <Section size="1" pt="1">
        <UserInfoDisplay />
      </Section>
    </>
  );
}
