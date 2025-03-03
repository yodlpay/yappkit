import { Flex, Box, Heading } from "@radix-ui/themes";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type PageHeaderProps = {
  title: string;
  backPath?: string;
};

export function PageHeader({ title, backPath }: PageHeaderProps) {
  return backPath ? (
    <Flex width="100%" align="center">
      <Box className="flex-1">
        {backPath && (
          <Link href={backPath}>
            <ChevronLeftIcon width={18} height={18} />
          </Link>
        )}
      </Box>
      <Heading size="4">{title}</Heading>
      <Box className="flex-1" />
    </Flex>
  ) : (
    <Heading size="4" align="center">
      {title}
    </Heading>
  );
}
