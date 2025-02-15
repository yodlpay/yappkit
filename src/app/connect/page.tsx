import { Box, Heading } from "@radix-ui/themes";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ConnectPage() {
  return (
    <Box p='4'>
      <Heading size='4'>Connect Your Wallet</Heading>
      {/* Add wallet connection logic here */}

      <ConnectButton />
    </Box>
  );
}
