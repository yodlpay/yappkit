"use client";

import { Container, Heading, Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <Container size='2' p='6'>
      <Flex direction='column' gap='6' align='center' minHeight='90vh'>
        <Heading>Fund your account</Heading>
      </Flex>
    </Container>
  );
}

export const dynamic = "force-static";
