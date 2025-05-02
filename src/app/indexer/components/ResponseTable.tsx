import { Flex, Button, Code, Box, Text } from "@radix-ui/themes";
import { useState } from "react";

type JsonViewerProps = {
  data: any;
  level?: number;
  isExpanded?: boolean;
};

export function ResponseTable({ data, level = 0, isExpanded = false }: JsonViewerProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  if (!data) return null;

  if (Array.isArray(data)) {
    return (
      <Flex as="span" direction="column" width="100%">
        <Flex align="center" gap="1">
          <Button variant="ghost" onClick={() => setExpanded(!expanded)}>
            {expanded ? "▼" : "▶"}
          </Button>
          <Code>[{data.length}]</Code>
        </Flex>
        {expanded && (
          <Box pl="2">
            {data.map((item, index) => (
              <Flex key={index} gap="1" style={{ whiteSpace: "nowrap" }}>
                <Code>{index}:</Code>
                <ResponseTable data={item} level={level + 1} />
              </Flex>
            ))}
          </Box>
        )}
      </Flex>
    );
  }

  if (typeof data === "object") {
    const preview = Object.entries(data)
      .slice(0, 2)
      .map(([k, v]) => `${k}: ${typeof v === "object" ? "..." : v}`)
      .join(", ");

    return (
      <Flex as="span" direction="column" width="100%">
        <Flex align="center" gap="1">
          <Button variant="ghost" onClick={() => setExpanded(!expanded)}>
            {expanded ? "▼" : "▶"}
          </Button>
          <Code>{`{ ${preview}${Object.keys(data).length > 2 ? ", ..." : ""} }`}</Code>
        </Flex>
        {expanded && (
          <Box pl="2">
            {Object.entries(data).map(([key, value]) => (
              <Flex key={key} gap="1" style={{ whiteSpace: "nowrap" }}>
                <Code>{key}:</Code>
                <ResponseTable data={value} level={level + 1} />
              </Flex>
            ))}
          </Box>
        )}
      </Flex>
    );
  }

  // Simple values
  return <Text as="span">{String(data)}</Text>;
}
