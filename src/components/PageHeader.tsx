import { Section, Flex, Box, Heading } from "@radix-ui/themes";
import { BackButton } from "./BackButton";

type PageHeaderProps = {
  title: string;
  backPath?: string;
};

export function PageHeader({ title, backPath }: PageHeaderProps) {
  return backPath ? (
    <Section pt='0' pb='3'>
      <Flex width='100%' align='center'>
        <Box className='flex-1'>{backPath && <BackButton path={backPath} />}</Box>
        <Heading size='4'>{title}</Heading>
        <Box className='flex-1' />
      </Flex>
    </Section>
  ) : (
    <Section pt='0' pb='3'>
      <Heading size='4' align='center'>
        {title}
      </Heading>
    </Section>
  );
}
