import { InfoBox } from "@/components/ui/InfoBox";
import { Card, Flex, Heading, Section, Text } from "@radix-ui/themes";

export function WriteBlockchain() {
  return (
    <div>
      <h1>Write Blockchain</h1>

      <Section size="1">
        <Heading>Write data</Heading>
        <InfoBox>
          <Text>To change blochchain state a message must be signed. </Text>
        </InfoBox>
        <InfoBox>
          <Text>Yapp users must connect their wallet to make on-chain write operations</Text>
        </InfoBox>
      </Section>

      <Section size="1">
        <Card>
          <Flex direction="column" gap="2" align="start">
            <Text>Yapp users must connect their wallet to make on-chain write operations</Text>
          </Flex>
        </Card>
      </Section>
    </div>
  );
}
