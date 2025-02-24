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
} from "@radix-ui/themes";
import { usePlayground } from "../../../providers/PlaygroundProvider";
import { useEffect, useState } from "react";
import { getTokenBySymbol, TokenInfo } from "@yodlpay/tokenlists";
import Image from "next/image";
import { fetchIndexerData } from "@/lib/indexerAapi";

type LeaderboardItem = {
  rank: number;
  sender: string;
  amountTotal: number;
  txCount: number;
};

type TokenCount = { token: TokenInfo; count: number };

export function Leaderboard() {
  const { queryParams, setQueryParams, response, setResponse, setResponseStatusCode } =
    usePlayground();
  const [receiver, setReceiver] = useState(queryParams.receiver || "vitalik.eth");
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [availableTokens, setAvailableTokens] = useState<TokenCount[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);

  const numberFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleSetSelectedToken = (symbol: string) => {
    const token = getTokenBySymbol(symbol);
    setSelectedToken(token);
  };

  const handleSubmit = async () => {
    try {
      const { status, data } = await fetchIndexerData("/payments", { receiver });
      setQueryParams({ receiver });
      setResponseStatusCode(status);
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseStatusCode(500);
    }
  };

  const processData = (data: any) => {
    if (!data?.payments) return;

    // Get unique tokens and their counts
    const tokenCounts = data.payments.reduce((acc: Record<string, number>, payment: any) => {
      const token = payment.tokenOutSymbol;
      acc[token] = (acc[token] || 0) + 1;
      return acc;
    }, {});

    const tokens = Object.entries(tokenCounts)
      .map(([symbol, count]): TokenCount | null => {
        const token = getTokenBySymbol(symbol);
        return token ? { token, count: Number(count) } : null;
      })
      .filter((item): item is TokenCount => item !== null)
      .sort((a, b) => b.count - a.count);

    setAvailableTokens(tokens);

    // If no token is selected, select the most frequent one
    if (!selectedToken && tokens.length > 0) {
      setSelectedToken(tokens[0].token);
    }
  };

  const getLeaderboardData = (payments: any[]): LeaderboardItem[] => {
    if (!payments) return [];

    const filteredPayments = selectedToken
      ? payments.filter((p) => p.tokenOutSymbol === selectedToken.symbol.toUpperCase()) // Changed to compare with symbol
      : payments;

    const senderTotals = filteredPayments.reduce(
      (acc: Record<string, { amount: number; count: number }>, payment: any) => {
        const sender = payment.senderEnsPrimaryName || payment.senderAddress;
        if (!acc[sender]) {
          acc[sender] = { amount: 0, count: 0 };
        }
        acc[sender].amount += Number(payment.tokenOutAmountGross);
        acc[sender].count += 1;
        return acc;
      },
      {}
    );

    return Object.entries(senderTotals)
      .map(([sender, { amount, count }]) => ({
        rank: 0,
        sender,
        amountTotal: Number(amount),
        txCount: count,
      }))
      .sort((a, b) => b.amountTotal - a.amountTotal)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  };

  useEffect(() => {
    if (response?.payments) {
      processData(response);
      const newLeaderboard = getLeaderboardData(response.payments);
      setLeaderboardData(newLeaderboard);
    }
  }, [response, selectedToken]);

  return (
    <>
      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Create a leaderboard
        </Heading>
        <Card>
          <Flex direction="column" gap="1">
            <Text size="2">Receiver</Text>
            <Flex gap="2">
              <TextField.Root
                size="2"
                placeholder="Receiver ENS or Address"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
              <Button size="2" onClick={handleSubmit}>
                Submit
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Section>

      <Section size="1" pt="0">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Leaderboard
        </Heading>
        <Card>
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
              {leaderboardData.map(({ sender, amountTotal, rank, txCount }) => (
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
