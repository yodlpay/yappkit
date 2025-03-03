import { TokenInfo } from '@yodlpay/tokenlists';
import { getTokenBySymbol } from '@yodlpay/tokenlists';
import { LeaderboardItem, TokenCount } from './Leaderboard';

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