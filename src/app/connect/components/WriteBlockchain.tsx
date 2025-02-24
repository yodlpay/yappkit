import { InfoBox } from "@/components/ui/InfoBox";
import { Card, Flex, Section, Text, Button, Link, Heading } from "@radix-ui/themes";
import { useAccount, useWriteContract } from "wagmi";
import { useState, useEffect } from "react";
import { COUNTER_ABI } from "@/constants/contractAbi";
import { COUNTER_ADDRESS_BY_CHAIN } from "@/constants/contracts";
import { base } from "viem/chains";
import { Loader } from "@/components/ui/Loader";
import { useBlockchain } from "@/providers/BlockchainProvider";

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
        <Flex direction="column" gap="2" justify="center">
          <Text align="center">
            To enable on-chain transactions besides Yodl payments, yapps must provide wallet
            connection functionality. This can be done easily with{" "}
            <Link href="https://www.rainbowkit.com/" target="_blank">
              RainbowKit
            </Link>{" "}
            for example.
          </Text>
        </Flex>
      </Section>

      {/* <InfoBox>Users can make transactions by connecting their wallet in a yapp.</InfoBox> */}

      <Section size="1">
        <Flex direction="column" gap="2" justify="center">
          <Text align="center">
            Increment the count on the Counter contract. Connect a wallet and select chain.
          </Text>
        </Flex>
      </Section>

      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Increment counter
        </Heading>
        <Card>
          <Flex direction="column" gap="2">
            <Flex gap="4" align="start" width="100%" justify="between">
              <Text>Counter: {counterValue?.toString() ?? "Loading..."}</Text>
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
