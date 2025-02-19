"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Card, Flex, Heading, Section, Table, Text, TextField } from "@radix-ui/themes";
import { InfoBox } from "@/components/InfoBox";
import { useEns, useNativeBalances } from "@/utils/hooks/useNativeBalances";
import { getChain } from "@yodlpay/tokenlists";
import { Address } from "viem";

export function ReadBlockchain() {
  // For testing, use a real address - this is Vitalik's address
  // const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const andyoee = "0x58A04F7D5831590F09145885eB16fDF46dB1445C";
  const [address, setAddress] = useState<Address>(andyoee);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data: balances, isLoading, isError } = useNativeBalances(address, shouldFetch);
  const [addressResult, nameResult] = useEns({ address });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShouldFetch(true);
  };

  const handleAddressChange = (value: string) => {
    setAddress(value as Address);
    setShouldFetch(false);
  };

  if (nameResult.isLoading) return <Text>Loading...</Text>;
  if (nameResult.error) return <Text>Error: {nameResult.error.message}</Text>;

  return (
    <>
      <Section size="1">
        {/* <Text>
          Yapps can use the details provided by the Yodl app to read data from the blockchain.
        </Text> */}
        <InfoBox>
          <Text>
            Yapps can use the details provided by the Yodl app to read data from the blockchain.
          </Text>
        </InfoBox>
      </Section>

      <Section size="1">
        <Card>
          {/* <form onSubmit={handleAddressSubmit}> */}
          <Flex gap="3" width="100%" justify="between">
            <TextField.Root
              size="2"
              placeholder="Enter address (0x...)"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
            ></TextField.Root>
            <Button
              size="2"
              type="submit"
              disabled={!address || shouldFetch}
              onClick={handleAddressSubmit}
            >
              Fetch Balances
            </Button>
          </Flex>

          {isLoading && <Text>Loading...</Text>}
          {isError && <Text>Error Fetching Balances</Text>}

          {balances && balances.length > 0 && (
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
          )}
        </Card>
      </Section>
    </>
  );
}
