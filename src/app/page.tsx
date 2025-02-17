"use client";

import { Box, Heading, Text, Flex, Section } from "@radix-ui/themes";
import { useUser } from "@/providers/UserProviders";
import { Loader } from "@/components/Loader";
import { InfoBox } from "@/components/InfoBox";
import { UserInfoDisplay } from "./userInfoDisplay";

export default function ProfilePage() {
  const { userInfo, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  if (!userInfo) {
    return (
      <Box p='4'>
        <Heading size='4'>User info could not be loaded</Heading>
        <Heading as='h2' color='gray'>
          Make sure you open the app via the Yodl app.
        </Heading>
      </Box>
    );
  }

  return (
    <>
      <Section size='1'>
        <Heading size='4' align='center'>
          Welcome to Kitchen Sink
        </Heading>
        <Heading as='h2' size='2' align='center' color='gray'>
          The all-in-one Yapp
        </Heading>
      </Section>
      <Section size='1'>
        <Flex direction='column' gap='3' align='center'>
          <Flex direction='column' gap='2'>
            <Text weight='bold' align='center'>
              What is a Yapp?
            </Text>
            <InfoBox>A Yapp is a Yodl mini-app</InfoBox>
          </Flex>
          <Flex direction='column' gap='2'>
            <Text weight='bold' align='center'>
              What is Kitchen Sink?
            </Text>
            <InfoBox>A Yodl protocol demo Yapp</InfoBox>
          </Flex>
        </Flex>
      </Section>
      <Section size='1'>
        <Heading as='h3' size='2' align='center' mb='2' color='gray'>
          Your details
        </Heading>
        <UserInfoDisplay />
      </Section>
    </>
  );
}
