import { Container, Flex } from "@radix-ui/themes";
import { Navigation } from "./Navigation";
import { Header } from "./Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container size="4" px="4">
      <Flex direction="column" minHeight="100vh" height="100vh">
        <Header />
        <main className="mb-12">{children}</main>
        <Container position="fixed" bottom="0" left="0" right="0" size="4">
          <Navigation />
        </Container>
      </Flex>
    </Container>
  );
}
