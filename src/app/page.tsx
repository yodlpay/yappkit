"use client";

import { Box, Heading, Text, Flex, Section, Popover, Button } from "@radix-ui/themes";
import { useUser } from "@/providers/UserProviders";
import { Loader } from "@/components/Loader";
import { InfoBox } from "@/components/InfoBox";
import { UserInfoDisplay } from "./userInfoDisplay";
import { ChatBubbleIcon, InfoCircledIcon } from "@radix-ui/react-icons";

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
        <Flex direction="column" gap="3" align="center">
          <Flex justify="center" align="center" gap="2">
            <Text>Kitchen Sink is a demo Yapp</Text>
            <Popover.Root>
              <Popover.Trigger>
                {/* Comment */}
                <Button variant="ghost">
                  {/* <ChatBubbleIcon width="16" height="16" /> */}
                  {/* <Text>Yapp</Text> */}
                  {/* Yapp */}
                  <InfoCircledIcon />
                </Button>
              </Popover.Trigger>
              <Popover.Content width="360px">
                <InfoBox>A Yapp is an app built on the Yodl protocol</InfoBox>
              </Popover.Content>
            </Popover.Root>
          </Flex>

          {/* <InfoBox>A Yapp is an app built on the Yodl protocol</InfoBox>
            <Text>Kitchen Sink is a A Yodl protocol demo Yapp</Text> */}
          <Flex direction="column" gap="2">
            {/* <Heading as="h3" size="2" align="center" mb="2" color="gray">
              What is Kitchen Sink?
            </Heading>
            <InfoBox>Kitchen Sink is a A Yodl protocol demo Yapp</InfoBox> */}
          </Flex>
        </Flex>
      </Section>
    </>
  );
}
