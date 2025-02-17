import { PageHeader } from '@/components/PageHeader';
import { Box, Flex, Heading } from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectPage() {
  return (
    <>
      <PageHeader title='Connect' backPath='/' />
      <Flex justify='center' align='center' height='100%'>
        <ConnectButton />
      </Flex>
    </>
  );
}
