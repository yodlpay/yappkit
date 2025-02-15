import { Box, Heading } from "@radix-ui/themes";
import { TransactionsList } from "./TransactionsList";

export default function TransactionsPage() {
  // Could fetch initial data here
  return (
    <Box p='4'>
      <Heading size='4'>Transaction History</Heading>
      <TransactionsList />
    </Box>
  );
}
