"use client";

import { PageHeader } from "@/components/PageHeader";
import { Box, Card, Flex, Link, Text } from "@radix-ui/themes";
import { FaChartLine, FaTrophy } from "react-icons/fa";

const INDEXER_SECTIONS = [
  {
    title: "Payments API",
    description: "Fetch indexed payments with the playground API",
    icon: FaChartLine,
    href: "/indexer/payments",
  },
  {
    title: "Leaderboard",
    description: "View and create leaderboards",
    icon: FaTrophy,
    href: "/indexer/leaderboard",
  },
] as const;

export default function DemosPage() {
  return (
    <>
      <PageHeader title='Indexer' />
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
    </>
  );
}
