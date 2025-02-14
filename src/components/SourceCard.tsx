import { Card, Heading, Text, Flex } from "@radix-ui/themes";
import { SOURCES, SOURCE_HEADERS } from "@/constants/sources";
import { SourceItem } from "./SourceItem";

type SourceCardProps = {
  sourceType: keyof typeof SOURCE_HEADERS;
  isMobile: boolean;
  ensOrAddress: string;
};

export const SourceCard = ({ sourceType, isMobile, ensOrAddress }: SourceCardProps) => {
  const sourcesForType = SOURCES[sourceType];

  if (sourcesForType.length === 0) return null;

  return (
    <Card size='2'>
      <Heading size='3' mb='2' className='uppercase'>
        {sourceType}s
      </Heading>
      <Text as='p' size='2' color='gray' mb='3'>
        {SOURCE_HEADERS[sourceType]}
      </Text>
      <Flex direction='column' gap='4'>
        {sourcesForType.map(source => (
          <SourceItem key={source.id} source={source} isMobile={isMobile} ensOrAddress={ensOrAddress} />
        ))}
      </Flex>
    </Card>
  );
};
