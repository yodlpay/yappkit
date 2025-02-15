"use client";

import { Box, Heading, Text, Flex, Card, Section } from "@radix-ui/themes";
import { useUser } from "@/contexts/UserContext";
import { Loader } from "@/components/Loader";
import { InfoBox } from "@/components/InfoBox";

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
        <Heading as='h2' size='1' align='center' color='gray'>
          The all-in-one Yapp
        </Heading>
      </Section>

      <Section size='1'>
        {/* <InfoBox>A Yapp is a Yodl mini-app</InfoBox> */}
        {/* <InfoBox>Kitchen Sink is a Yodl protocol demo Yapp</InfoBox> */}

        <Flex direction='column' gap='3'>
          <Flex direction='column' gap='2'>
            <Text as='p' ml='2' weight='bold'>
              What is a Yapp?
            </Text>
            <InfoBox>A Yapp is a Yodl mini-app</InfoBox>
            {/* <Text as='p' size='2'>
              A Yapp is a Yodl mini-app
              </Text> */}
          </Flex>

          <Flex direction='column' gap='2'>
            <Text as='p' ml='2' weight='bold'>
              What is Kitchen Sink?
            </Text>
            <InfoBox>A Yodl protocol demo Yapp</InfoBox>
            {/* <Text as='p' size='2'>
              A Yodl protocol demo Yapp
            </Text> */}
          </Flex>
        </Flex>
      </Section>

      <Card size='2' style={{ maxWidth: "600px" }}>
        <Flex direction='column' gap='3'>
          <Text weight='bold' color='gray'>
            Connected through{" "}
          </Text>
          <Text size='4'>{userInfo.communityEns}</Text>

          <Box>
            <Text size='2' weight='bold' color='gray'>
              Your Address
            </Text>
            <Text size='4' className='font-mono'>
              {userInfo.fullAddress}
            </Text>
            <Text size='2' color='gray'>
              ({userInfo.truncatedAddress})
            </Text>
          </Box>
        </Flex>
      </Card>
    </>
  );
}
