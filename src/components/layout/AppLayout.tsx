import { Container, Flex } from "@radix-ui/themes";
import { Header } from "./Header";
import { Navigation } from "./Navigation";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container size="1" px="4">
      <Flex direction="column" minHeight="100vh">
        <Header />
        <main className="mb-16">{children}</main>
        <Container size="1" px="4" position="fixed" bottom="0" left="0" right="0">
          <Navigation />
        </Container>
      </Flex>
    </Container>
  );
}
