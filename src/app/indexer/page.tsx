"use client";

import { Box, Heading, Card, Flex, Link, Text } from "@radix-ui/themes";
import { FaCreditCard, FaChartLine, FaTrophy } from "react-icons/fa";

const INDEXER_SECTIONS = [
  {
    title: "Transactions",
    description: "View recent transactions of connected address",
    icon: FaChartLine,
    href: "/indexer/transactions",
  },
  {
    title: "Leaderboard",
    description: "View top users and statistics",
    icon: FaTrophy,
    href: "/indexer/leaderboard",
  },
] as const;

export default function DemosPage() {
  return (
    <Box p='4'>
      <Heading size='4' mb='4'>
        Indexer
      </Heading>
      <Flex direction='column' gap='3'>
        {INDEXER_SECTIONS.map(({ title, description, icon: Icon, href }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <Card>
              <Flex align='center' gap='3'>
                <Icon size={24} />
                <Box>
                  <Text as='div' size='3' weight='bold'>
                    {title}
                  </Text>
                  <Text as='div' color='gray' size='2'>
                    {description}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
