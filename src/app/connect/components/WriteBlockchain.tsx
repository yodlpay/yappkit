import { InfoBox } from "@/components/ui/InfoBox";
import { Card, Flex, Section, Text, Button, Link, Heading } from "@radix-ui/themes";
import { useAccount, useWriteContract } from "wagmi";
import { useState, useEffect } from "react";
import { COUNTER_ABI } from "@/constants/contractAbi";
import { COUNTER_ADDRESS_BY_CHAIN } from "@/constants/contracts";
import { base } from "viem/chains";
import { Loader } from "@/components/ui/Loader";
import { useBlockchain } from "@/providers/BlockchainProvider";
import { CardList } from "@/components/ui/CardList";

const useCases = [
  {
    title: "Mint NFT",
    text: "Mint an NFT to a user's address.",
  },
  {
    title: "Claim",
    text: "Claim an (onchain) username for a user.",
  },
  {
    title: "Lottery",
    text: "Let users participate in a decentralized lottery.",
  },
];

export function WriteBlockchain() {
  const { isConnected, chainId } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { counterValue },
    fetchCounterValue,
  } = useBlockchain();

  // Fetch counter value on mount and when chainId changes
  useEffect(() => {
    fetchCounterValue(chainId || base.id);
  }, [chainId, fetchCounterValue]);

  const { writeContractAsync: increment } = useWriteContract();
  const handleIncrement = async () => {
    if (!chainId) return;
    setIsLoading(true);
    try {
      await increment({
        address: COUNTER_ADDRESS_BY_CHAIN[chainId],
        abi: COUNTER_ABI,
        functionName: "increment",
        args: [],
      });
      // Refetch the counter value after increment
      await fetchCounterValue(chainId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section size="1">
        <Flex direction="column" gap="2">
          <Text as="p" align="center">
            To enable on-chain transactions other than Yodl payments, yapps must provide wallet
            connection functionality. A few examples of what&apos;s possible:
          </Text>
          <CardList list={useCases} />
        </Flex>
      </Section>
      <Section size="1">
        <Text as="p" align="center">
          Below is an exmple of an on-chain transaction that requires a wallet connection. Connect a
          wallet and select chain to increment the count on the Counter contract.
        </Text>
      </Section>
      <Heading as="h3" size="2" align="center" color="gray">
        Increment counter
      </Heading>

      <Section size="1" pt="1">
        <Card size="1">
          <Flex direction="column" gap="2">
            <Flex gap="4" align="center" width="100%" justify="between">
              <Text size="2">Counter: {counterValue?.toString() ?? "Loading..."}</Text>
              <Button disabled={!isConnected || isLoading} onClick={handleIncrement}>
                {isLoading ? <Loader /> : "Increment"}
              </Button>
            </Flex>
            {!isConnected && (
              <InfoBox color="red">
                <Text>Please connect your wallet to interact</Text>
              </InfoBox>
            )}
          </Flex>
        </Card>
      </Section>
      <InfoBox>
        The Counter contract is deployed on base, polygon, and arbitrum. Incrementing requires a
        small amount of gas.
      </InfoBox>
    </>
  );
}
