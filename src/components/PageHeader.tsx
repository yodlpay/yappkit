import { Section, Flex, Box, Heading } from "@radix-ui/themes";
import { BackButton } from "./BackButton";

type PageHeaderProps = {
  title: string;
  backPath?: string;
};

export function PageHeader({ title, backPath }: PageHeaderProps) {
  return (
    <Section p='4'>
      <Flex width='100%' align='center'>
        <Box className='flex-1'>{backPath && <BackButton path={backPath} />}</Box>
        <Heading size='4'>{title}</Heading>
        <Box className='flex-1' />
      </Flex>
    </Section>
  );
}
