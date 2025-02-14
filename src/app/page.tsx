"use client";

import { Container, Heading, Text, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { SOURCE_HEADERS } from "@/constants/sources";
import { typedKeys } from "@/utils/typeUtils";
import { SourceCard } from "@/components/SourceCard";

export default function Home() {
  const [ensOrAddress, setEnsOrAddress] = useState<string>("your-ens.eth");
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const decodeToken = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const jwtFromParams = params.get("jwt");
        if (!jwtFromParams) return;

        const payload = JSON.parse(atob(jwtFromParams));
        setEnsOrAddress(payload.ensName);
      } catch (e) {
        setError("Invalid token format");
      }
    };
    decodeToken();
    const parser = new UAParser();
    setIsMobile(parser.getDevice().type === "mobile");
  }, []);

  return (
    <Container size='2' p='6'>
      <Flex direction='column' gap='6' align='center' minHeight='90vh'>
        {error ? (
          <Text color='red'>{error}</Text>
        ) : (
          <>
            <Flex direction='column' gap='2' align='center'>
              <Heading>Fund your account</Heading>
              <Heading size='2'>
                Transfer assets to{" "}
                <Text size='4' color='iris' className='fontFamily-mono'>
                  {ensOrAddress}
                </Text>
              </Heading>
            </Flex>

            <Flex direction='column' gap='4' width='100%' maxWidth='400px'>
              {typedKeys(SOURCE_HEADERS).map(sourceType => (
                <SourceCard key={sourceType} sourceType={sourceType} isMobile={isMobile} ensOrAddress={ensOrAddress} />
              ))}
            </Flex>
          </>
        )}
      </Flex>
    </Container>
  );
}

export const dynamic = "force-static";
