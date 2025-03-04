import { TokenInfo, getTokenBySymbol } from "@yodlpay/tokenlists";
import { LeaderboardItem, TokenCount } from "./Leaderboard";
import { QueryParams } from "../types";
import { CONFIG } from "@/constants";

export const processPaymentsData = (payments: any[]): TokenCount[] => {
  const tokenCounts = payments.reduce((acc: Record<string, number>, payment: any) => {
    const token = payment.tokenOutSymbol;
    acc[token] = (acc[token] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(tokenCounts)
    .map(([symbol, count]): TokenCount | null => {
      const token = getTokenBySymbol(symbol);
      return token ? { token, count: Number(count) } : null;
    })
    .filter((item): item is TokenCount => item !== null)
    .sort((a, b) => b.count - a.count);
};

export const getLeaderboardData = (
  payments: any[],
  selectedToken: TokenInfo | null
): LeaderboardItem[] => {
  if (!payments) return [];

  const filteredPayments = selectedToken
    ? payments.filter((p) => p.tokenOutSymbol === selectedToken.symbol.toUpperCase())
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

export const buildQueryString = (params: Record<string, any>) => {
  const processedParams = { ...params };

  if (processedParams.sourceChainIds?.includes("all")) {
    delete processedParams.sourceChainIds;
  }

  const urlParams = new URLSearchParams();
  Object.entries(processedParams).forEach(([key, value]) => {
    let keyToUse = key;
    if (["sender", "receiver"].includes(key)) {
      const valueStr = Array.isArray(value) ? value[0] : value;
      keyToUse = valueStr?.startsWith("0x") ? key : key + "EnsPrimaryName";
    }

    if (value) {
      if (Array.isArray(value)) {
        const joinedValue = value.filter((v) => v.trim()).join(",");
        if (joinedValue) {
          urlParams.append(keyToUse, joinedValue);
        }
      } else if (typeof value === "string" && value.trim() !== "") {
        urlParams.append(keyToUse, value);
      }
    }
  });
  return urlParams.toString() ? `?${urlParams.toString()}` : "";
};

export const fetchIndexerData = async (params: QueryParams) => {
  const queryString = buildQueryString(params);
  const url = `${CONFIG.INDEXER_URL}/payments${queryString}`;
  const response = await fetch(url);
  return {
    status: response.status,
    data: await response.json(),
  };
};
