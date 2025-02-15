import { Container, Flex } from "@radix-ui/themes";
import { Navigation } from "./Navigation";
import { Header } from "./Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container size='4' p='0'>
      <Flex direction='column' height='100vh'>
        <Header />
        <main className='px-4'>{children}</main>
        <Container position='fixed' bottom='0' left='0' right='0' size='4' className='border-2 border-red-500'>
          <Navigation />
        </Container>
      </Flex>
    </Container>
  );
}
