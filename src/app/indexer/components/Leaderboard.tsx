import {
  Section,
  Table,
  TextField,
  Select,
  Flex,
  Text,
  Button,
  Card,
  Heading,
  Callout,
  Skeleton,
  Box,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getTokenBySymbol, TokenInfo } from "@yodlpay/tokenlists";
import Image from "next/image";
import { getLeaderboardData } from "./utils";
import { processPaymentsData } from "./utils";
import { useIndexerQuery } from "@/hooks/useIndexerQuery";
import { CardList } from "@/components/ui/CardList";
import { useUserContext } from "@/hooks/useUserContext";

export type LeaderboardItem = {
  rank: number;
  sender: string;
  amountTotal: number;
  txCount: number;
};

export type TokenCount = { token: TokenInfo; count: number };

const USECASES = [
  {
    title: "Confirmation",
    text: "Confirm a payment has been made",
  },
  {
    title: "Leaderboard",
    text: "Create leaderboards",
  },
  {
    title: "Milestones",
    text: "Show progress towards milestones",
  },
];

export function Leaderboard() {
  const { data: userContext } = useUserContext();
  const [receiverEnsPrimaryName, setReceiverEnsPrimaryName] = useState(
    userContext?.primaryEnsName || "vitalik.eth"
  );
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [availableTokens, setAvailableTokens] = useState<TokenCount[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);

  const { data, isLoading, isError, refetch } = useIndexerQuery({
    receiverEnsPrimaryName,
  });

  useEffect(() => {
    if (!data) return;

    // Handle error case
    if ("error" in data) {
      setAvailableTokens([]);
      setLeaderboardData([]);
      return;
    }

    const tokens = processPaymentsData(data.payments);
    setAvailableTokens(tokens);

    if (!selectedToken && tokens.length > 0) {
      setSelectedToken(tokens[0].token);
    }

    const newLeaderboard = getLeaderboardData(data.payments, selectedToken);
    setLeaderboardData(newLeaderboard);
  }, [data, selectedToken]);

  const numberFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleSetSelectedToken = (symbol: string) => {
    const token = getTokenBySymbol(symbol);
    setSelectedToken(token);
  };

  const handleSubmit = () => {
    refetch();
  };

  return (
    <>
      <Section size="1">
        <Flex direction="column" gap="2">
          <Text as="p" align="center">
            A leadeboard is just one of many possible applications of the payments history. Listed
            below are a few other use cases.
          </Text>
          <CardList list={USECASES} />
        </Flex>
      </Section>

      <Section size="1">
        <Text as="p" align="center">
          Fill in a receiver address or ENS to create a leaderboard of the top senders to a
          receiver.
        </Text>
      </Section>

      <Heading as="h3" size="2" align="center" color="gray">
        Create a leaderboard
      </Heading>

      <Section size="1" pt="1">
        <Card size="1">
          <Flex direction="column" gap="1">
            <Text size="2">Receiver</Text>
            <Flex gap="2">
              <TextField.Root
                size="2"
                placeholder="Receiver ENS or Address"
                value={receiverEnsPrimaryName}
                onChange={(e) => setReceiverEnsPrimaryName(e.target.value)}
              />
              <Button size="2" onClick={handleSubmit}>
                Submit
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Section>

      <Heading as="h3" size="2" align="center" color="gray">
        Leaderboard
      </Heading>

      <Section size="1" pt="1">
        <Card size="1">
          {availableTokens.length > 0 && (
            <Section size="1" pt="0">
              <Flex direction="column" gap="1">
                <Text size="2">Filter by Token</Text>
                <Select.Root value={selectedToken?.symbol} onValueChange={handleSetSelectedToken}>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Tokens</Select.Label>
                      {availableTokens.map(({ token, count }) => (
                        <Select.Item key={token.symbol} value={token.symbol}>
                          <Flex align="center" gap="2">
                            <Image
                              src={token.logoUri || ""}
                              alt={token.symbol}
                              width={20}
                              height={20}
                            />
                            {token.symbol} ({count})
                          </Flex>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Section>
          )}

          {isError && (
            <Callout.Root color="red">
              <Callout.Text>
                No data found for this address. Please check if the ENS or address is correct.
              </Callout.Text>
            </Callout.Root>
          )}

          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Sender</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell justify="end">Amount</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell justify="center">Count</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {isLoading && (
                <>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Table.Row key={`skeleton-${i}`}>
                        <Table.RowHeaderCell>
                          <Skeleton>
                            <Box width="20px">{i + 1}</Box>
                          </Skeleton>
                        </Table.RowHeaderCell>
                        <Table.Cell>
                          <Skeleton>
                            <Text>0x1234...5678</Text>
                          </Skeleton>
                        </Table.Cell>
                        <Table.Cell justify="end">
                          <Skeleton>
                            <Text className="font-mono">1000.00</Text>
                          </Skeleton>
                        </Table.Cell>
                        <Table.Cell justify="center">
                          <Skeleton>
                            <Text>10</Text>
                          </Skeleton>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </>
              )}
              {data &&
                !isLoading &&
                !isError &&
                leaderboardData.map(({ sender, amountTotal, rank, txCount }) => (
                  <Table.Row key={sender}>
                    <Table.RowHeaderCell>{rank}</Table.RowHeaderCell>
                    <Table.Cell>
                      {sender.length > 20 ? sender.slice(0, 12) + "..." + sender.slice(-4) : sender}
                    </Table.Cell>
                    <Table.Cell justify="end" className="font-mono ">
                      {numberFormatter.format(amountTotal)}
                    </Table.Cell>
                    <Table.Cell justify="center">{txCount}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </Section>
    </>
  );
}
