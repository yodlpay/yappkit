"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, Flex, Section, Table, Text, Select, Heading, Callout } from "@radix-ui/themes";
import { useBlockchain } from "@/providers/BlockchainProvider";
import { CardList } from "@/components/ui/CardList";
import { useUser } from "@/providers/UserProviders";
import { SupportedChainId } from "@/types";
import { SUPPORTED_CHAINS } from "@/constants";

const useCases = [
  {
    title: "Balance",
    text: "Fetch token balances of users.",
  },
  {
    title: "Airdrop",
    text: "Target users or communities in airdrops.",
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
  const [selectedChainId, setSelectedChainId] = useState<SupportedChainId>(8453); // Default to Base
  const { userInfo, isLoading } = useUser();
  const [isLoadingTokenBalances, setIsLoadingTokenBalances] = useState(false);
  const {
    state: { tokenBalances },
    fetchTokenBalances,
  } = useBlockchain();

  useEffect(() => {
    if (userInfo) {
      setIsLoadingTokenBalances(true);
      fetchTokenBalances(userInfo.address, selectedChainId, TOKENS_TO_FETCH).finally(() =>
        setIsLoadingTokenBalances(false)
      );
    }
  }, [userInfo?.address, selectedChainId]);

  return (
    <>
      <Section size="1">
        <Flex direction="column" gap="2">
          <Text as="p" align="center">
            Building great yapps does not require a wallet connection. The verified properties of
            the jwt enables yapps to identify users and communities. A few examples of what&apos;s
            possible:
          </Text>
          <CardList list={useCases} />
        </Flex>
      </Section>

      <Section size="1">
        <Text as="p" align="center">
          Below shows select stable coin balances of the user&apos;s address from the jwt. Switch
          the chain to fetch balances on other chains.
        </Text>
      </Section>

      <Heading as="h3" size="2" align="center" color="gray">
        Balances of {userInfo?.truncatedAddress}
      </Heading>

      <Section size="1" pt="1">
        <Card>
          <Flex direction="column" gap="4">
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
                          <Image src={logoUri ?? ""} alt={chainName} width={20} height={20} />
                          {chainName}
                        </Flex>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              {userInfo ? (
                <Flex direction="column" gap="1">
                  <Table.Root size="1">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Token</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="center">Amount</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {tokenBalances.map(({ token, formatted }) => (
                        <Table.Row key={token.symbol}>
                          <Table.RowHeaderCell align="center">
                            <Flex gap="2">
                              <Image
                                src={token.logoUri ?? ""}
                                alt={token.symbol}
                                width={20}
                                height={20}
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
              ) : (
                <Callout.Root color="red">
                  <Callout.Text>
                    Token details could not be loaded. Make sure you open the app via the Yodl app.
                  </Callout.Text>
                </Callout.Root>
              )}
            </Flex>
          </Flex>
        </Card>
      </Section>
    </>
  );
}
