"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  Flex,
  Section,
  Table,
  Text,
  Select,
  Heading,
  Callout,
  Skeleton,
  Box,
  Code,
} from "@radix-ui/themes";
import { CardList } from "@/components/ui/CardList";
import { SupportedChainId } from "@/types";
import { SUPPORTED_CHAINS } from "@/constants";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useUserContext } from "@/hooks/useUserContext";
import { truncateAddress } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const USECASES = [
  {
    title: "Balance",
    text: "Fetch token balances of users.",
  },
  {
    title: "Airdrop",
    text: "Target users or communities with airdrops.",
  },
  {
    title: "ENS",
    text: "Check if an ENS name or NFT is available.",
  },
  {
    title: "POAP",
    text: "Send a POAP to a user's address.",
  },
];

const TOKENS_TO_FETCH = ["USDT", "USDC", "USDGLO", "DAI", "USDM"];

export function ReadBlockchain() {
  const [selectedChainId, setSelectedChainId] = useState<SupportedChainId>(8453);
  const { data: userContext, isLoading } = useUserContext();

  const {
    data: tokenBalances,
    isLoading: isLoadingTokenBalances,
    isError: isErrorTokenBalances,
  } = useTokenBalances(userContext?.address, selectedChainId, TOKENS_TO_FETCH);

  const headingText = isLoading
    ? "Loading..."
    : userContext?.address
    ? `Balances of ${truncateAddress(userContext.address)}`
    : "Unable to fetch user context";

  return (
    <>
      <Section size="1">
        <Flex direction="column" gap="2">
          <Text as="p" align="center">
            Building great yapps does not require a wallet connection. Yapps can leverage the
            <Code>userContext</Code> from the sdk to identify users and communities. A few examples
            of what&apos;s possible:
          </Text>
          <CardList list={USECASES} />
        </Flex>
      </Section>
      <Section size="1">
        <Text as="p" align="center">
          See select stable coin balances of the user&apos;s address below. Switch the chain to
          fetch balances on other chains.
        </Text>
      </Section>

      {!userContext && (
        <Callout.Root mb="4" color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>Open this yapp through the Yodl app to fetch user context.</Callout.Text>
        </Callout.Root>
      )}
      <Heading as="h3" size="2" align="center" color="gray">
        {headingText}
      </Heading>
      <Section size="1" pt="1">
        <Card size="1">
          <Flex direction="column" gap="3">
            <Flex direction="column" gap="1">
              <Text size="2">Chain</Text>
              <Select.Root
                value={selectedChainId.toString()}
                onValueChange={(value) => setSelectedChainId(Number(value) as SupportedChainId)}
              >
                <Select.Trigger className="w-fit" />
                <Select.Content>
                  {SUPPORTED_CHAINS.map(({ chainId, chainName, logoUri }) => (
                    <Select.Item key={chainId} value={String(chainId)}>
                      <Flex align="center" gap="2">
                        <Image
                          src={logoUri ?? ""}
                          alt={chainName}
                          width={20}
                          height={20}
                          style={{ maxWidth: "20px", maxHeight: "20px" }}
                        />
                        {chainName}
                      </Flex>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            {isErrorTokenBalances && (
              <Callout.Root color="red">
                <Callout.Text>
                  Token details could not be loaded. Make sure you open the app via the Yodl app.
                </Callout.Text>
              </Callout.Root>
            )}

            <Flex direction="column" gap="1">
              <Table.Root size="1">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Token</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify="center">Amount</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {isLoadingTokenBalances && (
                    <>
                      {TOKENS_TO_FETCH.map((token, i) => (
                        <Table.Row key={`skeleton-${i}`}>
                          <Table.RowHeaderCell>
                            <Flex gap="2">
                              <Skeleton>
                                <Box width="20px" height="20px" />
                              </Skeleton>
                              <Skeleton>
                                <Text>{token}</Text>
                              </Skeleton>
                            </Flex>
                          </Table.RowHeaderCell>
                          <Table.Cell justify="center">
                            <Skeleton>
                              <Text>0.00</Text>
                            </Skeleton>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </>
                  )}
                  {tokenBalances &&
                    !isLoadingTokenBalances &&
                    !isErrorTokenBalances &&
                    tokenBalances.map(({ token, formatted }) => (
                      <Table.Row key={token.symbol}>
                        <Table.RowHeaderCell align="center">
                          <Flex gap="2">
                            <Image
                              src={token.logoUri ?? ""}
                              alt={token.symbol}
                              width={20}
                              height={20}
                              style={{ maxWidth: "20px", maxHeight: "20px" }}
                            />
                            <Text>{token.symbol}</Text>
                          </Flex>
                        </Table.RowHeaderCell>
                        <Table.Cell justify="center" className="font-mono">
                          {Number(formatted).toFixed(2)}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table.Root>
            </Flex>
          </Flex>
        </Card>
      </Section>
    </>
  );
}
