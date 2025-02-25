"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Button,
  Card,
  Flex,
  ScrollArea,
  Section,
  Table,
  Text,
  TextField,
  Link,
  Heading,
} from "@radix-ui/themes";
import { InfoBox } from "@/components/ui/InfoBox";
import { getChain } from "@yodlpay/tokenlists";
import { Address } from "viem";
import { Loader } from "@/components/ui/Loader";
import { useBlockchain } from "@/providers/BlockchainProvider";
import { CodeCopy } from "@/components/ui/CodeCopy";
import { accentColor } from "@/constants";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { CardList } from "@/components/ui/CardList";

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

export function ReadBlockchain() {
  const [ensInput, setEnsInput] = useState<Address | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLoadingEns, setIsLoadingEns] = useState(false);
  const {
    state: { balances, addressFromEns, lastEnsQueried, lastAddressQueried },
    fetchBalances,
    fetchEnsName,
  } = useBlockchain();

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingAddress(true);
    if (!address) return;
    await fetchBalances(address);
    setIsLoadingAddress(false);
  };

  const handleAddressChange = (value: string) => {
    setAddress(value as Address);
  };

  const handleEnsLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ensInput) return;

    setIsLoadingEns(true);
    const resolvedAddress = await fetchEnsName(ensInput);
    console.log("🚀 resolvedAddress:", resolvedAddress);
    if (resolvedAddress) {
      setAddress(resolvedAddress);
    }
    setIsLoadingEns(false);
  };

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
          As an example, below are balances of a few select tokens of the user address from the jwt.
        </Text>
      </Section>

      <Section size="1" pt="0">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Fetch address and balances
        </Heading>
        <Card>
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="3">
              <Flex direction="column" gap="1">
                <Text size="2">Ens</Text>
                <Flex gap="3">
                  <TextField.Root
                    size="2"
                    placeholder="vitalik.eth"
                    value={ensInput || ""}
                    onChange={(e) => setEnsInput(e.target.value as Address)}
                  />
                  <Button size="2" disabled={!ensInput || isLoadingEns} onClick={handleEnsLookup}>
                    {isLoadingEns ? <Loader /> : <Text size="1">Lookup ENS</Text>}
                  </Button>
                </Flex>
              </Flex>

              {addressFromEns && (
                <Flex direction="column" gap="1">
                  <Text as="p" size="2" className="text-start">
                    Address of{" "}
                    <Text as="span" color={accentColor}>
                      {lastEnsQueried}
                    </Text>
                    :
                  </Text>
                  <ScrollArea scrollbars="horizontal" className="text-xs py-1">
                    <CodeCopy text={addressFromEns} position="back" justify="start" />
                  </ScrollArea>
                </Flex>
              )}
            </Flex>

            <Flex direction="column" gap="3">
              <Flex direction="column" gap="1">
                <Text size="2">Address</Text>
                <Flex gap="3">
                  <TextField.Root
                    size="2"
                    placeholder="0x12345..."
                    value={address || ""}
                    onChange={(e) => handleAddressChange(e.target.value)}
                  ></TextField.Root>
                  <Button
                    size="2"
                    type="submit"
                    disabled={!address || isLoadingAddress}
                    onClick={handleAddressSubmit}
                  >
                    {isLoadingAddress ? <Loader /> : <Text size="1">Get Balances</Text>}
                  </Button>
                </Flex>
              </Flex>

              {balances.length > 0 && (
                <Flex direction="column" gap="1">
                  <Text as="p" size="2" className="text-start">
                    Balances of{" "}
                    <Text as="span" color={accentColor}>
                      {lastAddressQueried?.slice(0, 6)}...{lastAddressQueried?.slice(-4)}
                    </Text>
                    :
                  </Text>

                  <Table.Root size="1">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell justify="center">Chain</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="center">Amount</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="center">Coin</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {balances.map(({ chainId, formatted }) => (
                        <Table.Row key={chainId}>
                          <Table.RowHeaderCell justify="center">
                            <Flex justify="center">
                              <Image
                                src={getChain(chainId).logoUri}
                                alt={getChain(chainId).chainName}
                                width={20}
                                height={20}
                              />
                            </Flex>
                          </Table.RowHeaderCell>
                          <Table.Cell justify="center" className="font-mono ">
                            {formatted.slice(0, 8)}
                          </Table.Cell>
                          <Table.Cell justify="center">
                            <Text>{getChain(chainId).nativeTokenName}</Text>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Card>
      </Section>
    </>
  );
}
