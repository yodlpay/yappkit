"use client";

import { Box, Heading, Text, Flex, Card, Section } from "@radix-ui/themes";
import { useUser } from "@/providers/UserProviders";
import { Loader } from "@/components/Loader";
import { InfoBox } from "@/components/InfoBox";
import { Suspense } from "react";
import { UserProvider } from "@/providers/UserProviders";

export default function ProfilePage() {
  const { userInfo, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  if (!userInfo) {
    return (
      <Box p='4'>
        <Heading size='4'>Profile</Heading>
        <Heading as='h2' color='gray'>
          Please connect your wallet to view your profile.
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
        {/* <Text>Kitchen Sink is an interactive demo Yapp built by Yodl.</Text>
          <Text>It serves as en example of how to build a Yapp using the Yodl protocol.</Text> */}

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
          <Flex direction='column' gap='2'>
            <Text weight='bold' align='center'>
              You are connected with the following details
            </Text>
          </Flex>
        </Flex>
      </Section>

      {/* https://www.radix-ui.com/themes/docs/components/data-list */}

      <Card size='2' style={{ maxWidth: "600px" }}>
        <Flex direction='column' gap='3'>
          {Object.entries(userInfo).map(([key, value]) => (
            <Flex key={key} direction='column' gap='2'>
              <Text weight='bold' color='gray'>
                {key}
              </Text>
              <Text size='4'>{value}</Text>
            </Flex>
          ))}
        </Flex>
      </Card>
      <Card size='2' style={{ maxWidth: "600px" }}>
        <Flex direction='column' gap='3'>
          {Object.entries(userInfo).map(([key, value]) => (
            <Flex key={key} direction='column' gap='2'>
              <Text weight='bold' color='gray'>
                {key}
              </Text>
              <Text size='4'>{value}</Text>
            </Flex>
          ))}
        </Flex>
      </Card>
      <Card size='2' style={{ maxWidth: "600px" }}>
        <Flex direction='column' gap='3'>
          {Object.entries(userInfo).map(([key, value]) => (
            <Flex key={key} direction='column' gap='2'>
              <Text weight='bold' color='gray'>
                {key}
              </Text>
              <Text size='4'>{value}</Text>
            </Flex>
          ))}
        </Flex>
      </Card>
      <Card size='2' style={{ maxWidth: "600px" }}>
        <Flex direction='column' gap='3'>
          {Object.entries(userInfo).map(([key, value]) => (
            <Flex key={key} direction='column' gap='2'>
              <Text weight='bold' color='gray'>
                {key}
              </Text>
              <Text size='4'>{value}</Text>
            </Flex>
          ))}
        </Flex>
      </Card>
    </>
  );
}
