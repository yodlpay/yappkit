import { CopyIcon } from "@radix-ui/react-icons";
import { Code, Flex, IconButton } from "@radix-ui/themes";

type CodeCopyProps = {
  text: string;
  truncate?: boolean;
  variant?: "ghost" | "outline" | "solid" | "soft";
};

export const CodeCopy = ({ text, truncate, variant }: CodeCopyProps) => {
  return (
    <Flex align='center' width='100%'>
      <Code className='mr-2' truncate={truncate} variant={variant}>
        {text}
      </Code>
      <IconButton size='1' aria-label='Copy value' color='gray'>
        <CopyIcon />
      </IconButton>
    </Flex>
  );
};
