import { InfoBox } from "@/components/ui/InfoBox";
import { Card, Flex, Section, Text, Button, Heading, Spinner } from "@radix-ui/themes";
import { useAccount } from "wagmi";
import { base } from "viem/chains";
import { CardList } from "@/components/ui/CardList";
import { useCounter } from "@/hooks/useCounter";

const USECASES = [
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
  const { value: counterValue, increment, isLoading, error } = useCounter(chainId || base.id);

  const handleIncrement = async () => {
    if (!chainId || chainId === 1) return;
    try {
      await increment();
    } catch (error) {
      console.error("Failed to increment counter:", error);
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
          <CardList list={USECASES} />
        </Flex>
      </Section>
      <Section size="1">
        <Text as="p" align="center">
          Below is an example of an on-chain transaction that requires a wallet connection. Connect
          a wallet and select chain to increment the count on the Counter contract.
        </Text>
      </Section>
      <Heading as="h3" size="2" align="center" color="gray">
        Increment counter
      </Heading>

      <Section size="1" pt="1">
        <Card size="1">
          <Flex direction="column" gap="2">
            <Flex gap="4" align="center" width="100%" justify="between">
              <Text size="2">
                Counter:{" "}
                {chainId === 1 ? (
                  ""
                ) : counterValue !== undefined ? (
                  counterValue.toString()
                ) : (
                  <Spinner />
                )}
              </Text>
              <Button
                disabled={!isConnected || isLoading || chainId === 1}
                onClick={handleIncrement}
              >
                {isLoading ? <Spinner /> : "Increment"}
              </Button>
            </Flex>
            {chainId === 1 && (
              <InfoBox color="red">
                <Text>Please switch to a chain other than mainnet</Text>
              </InfoBox>
            )}
            {!isConnected && (
              <InfoBox color="red">
                <Text>Please connect your wallet to interact</Text>
              </InfoBox>
            )}
            {error && (
              <InfoBox color="red">
                <Text>{error.message}</Text>
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
