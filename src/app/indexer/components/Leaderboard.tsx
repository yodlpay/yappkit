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
import { CardList } from "@/components/ui/CardList";
import { useUser } from "@/providers/UserProviders";
import { getLeaderboardData } from "./utils";
import { processPaymentsData } from "./utils";

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
  const { queryParams, setQueryParams, response, setResponse, setResponseStatusCode } =
    usePlayground();
  const { userInfo } = useUser();
  const [receiver, setReceiver] = useState(queryParams.receiver || userInfo?.ens || "vitalik.eth");
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [availableTokens, setAvailableTokens] = useState<TokenCount[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    if (response?.payments) {
      const tokens = processPaymentsData(response.payments);
      setAvailableTokens(tokens);

      if (!selectedToken && tokens.length > 0) {
        setSelectedToken(tokens[0].token);
      }

      const newLeaderboard = getLeaderboardData(response.payments, selectedToken);
      setLeaderboardData(newLeaderboard);
    }
  }, [response, selectedToken]);

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
      const { status, data } = await fetchIndexerData({ receiver });
      setQueryParams({ receiver });
      setResponseStatusCode(status);
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseStatusCode(500);
    }
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
