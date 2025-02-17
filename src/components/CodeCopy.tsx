import { CopyIcon } from "@radix-ui/react-icons";
import { Code, Flex, IconButton } from "@radix-ui/themes";

type CodeCopyProps = {
  text: string;
  truncate?: boolean;
};

export const CodeCopy = ({ text, truncate }: CodeCopyProps) => {
  return (
    <Flex align='center' width='100%' justify='between'>
      <Code className='mr-2' truncate={truncate} variant='ghost'>
        {text}
      </Code>
      <IconButton size='1' aria-label='Copy value' variant='ghost'>
        <CopyIcon />
      </IconButton>
    </Flex>
  );
};
