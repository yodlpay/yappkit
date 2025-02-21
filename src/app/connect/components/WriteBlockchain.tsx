import { InfoBox } from "@/components/ui/InfoBox";
import { Card, Flex, Heading, Section, Text, Button, Link } from "@radix-ui/themes";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useState } from "react";
import { COUNTER_ABI } from "@/constants/contractAbi";
import { COUNTER_ADDRESS_BY_CHAIN } from "@/constants/contracts";
import { base } from "viem/chains";
import { Loader } from "@/components/ui/Loader";

export function WriteBlockchain() {
  const { isConnected, chainId } = useAccount();
  console.log("🚀 chainId:", chainId);
  const [isLoading, setIsLoading] = useState(false);

  const { data: count, isLoading: isCountLoading } = useReadContract({
    address: COUNTER_ADDRESS_BY_CHAIN[chainId || base.id],
    abi: COUNTER_ABI,
    functionName: "number",
  });
  console.log("🚀 isLoading:", isLoading);
  console.log("🚀 count:", count);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section size="1">
        <Flex direction="column" gap="2" justify="center">
          <Text align="center">
            To enable on-chain user transactions, yapps must provide a wallet connection. This can
            be done easily with {/* <Link href="https://ethers.org/">Ethers.js</Link> and{" "} */}
            <Link href="https://www.rainbowkit.com/" target="_blank">
              RainbowKit
            </Link>{" "}
            for example.
            {/* and{" "}
            <Link href="https://viem.sh" target="_blank">Viem</Link> make it easy to get started. */}
          </Text>
        </Flex>
      </Section>

      <InfoBox>Users can make transactions by connecting their wallet in a yapp.</InfoBox>

      <Section size="1">
        {/* <Flex direction="column" gap="3"> */}
        <Flex direction="column" gap="2" justify="center">
          <Text align="center">
            Increment the count on the Counter contract. Connect a wallet and select one of base,
            polygon or arbitrum chain.
          </Text>
        </Flex>
      </Section>

      <Card>
        <Flex gap="4" align="start" width="100%" justify="between">
          <Text>Counter: {count?.toString() ?? "Loading..."}</Text>
          <Button disabled={!isConnected || isLoading} onClick={handleIncrement}>
            {isLoading ? <Loader /> : "Increment"}
          </Button>
          {!isConnected && <Text color="red">Please connect your wallet to interact</Text>}
        </Flex>
      </Card>
      <Section size="1">
        <InfoBox>
          The Counter contract is deployed on base, polygon, and arbitrum. Incrementing requires a
          small amount of gas.
        </InfoBox>
      </Section>
      {/* </Flex> */}
    </>
  );
}
