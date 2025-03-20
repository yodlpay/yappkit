import { Box, Container, Flex } from "@radix-ui/themes";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { GrainyFilter } from "./GrainyFilter";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div className="blob-cont">
        <div className="light-purple blob"></div>
        <div className="deep-purple blob"></div>
      </div>
      <GrainyFilter />
      <Container size="2">
        <Header />
        <Flex direction="column">
          <main className="mb-16 px-4">{children}</main>
        </Flex>
      </Container>
      <Box position="fixed" bottom="0" left="0" right="0" className="backdrop-blur">
        <Container size="2">
          <Navigation />
        </Container>
      </Box>
    </>
  );
}
