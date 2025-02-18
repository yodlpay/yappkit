import { Card, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { InfoBox } from "@/components/InfoBox";

export function ReadBlockchain() {
  return (
    <div>
      <Section size="1">
        <Heading>Read data</Heading>
        <Text>
          Yapps can use the details provided by the Yodl app such as community ENS and user
          ENS/Address to read data from the blockchain. Here we fetch the Balance of the User
          address.
        </Text>
      </Section>

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
