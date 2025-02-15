"use client";

import { Box, Heading, Text, Link, Flex } from "@radix-ui/themes";
import { FaArrowLeft } from "react-icons/fa";

export default function LeaderboardPage() {
  return (
    <Box p='4'>
      <Link href='/demos' style={{ textDecoration: "none", color: "inherit" }}>
        <Flex align='center' gap='2' mb='4'>
          <FaArrowLeft size={14} />
          <Text size='2'>Back to Demos</Text>
        </Flex>
      </Link>
      <Heading size='4' mb='4'>
        Leaderboard
      </Heading>
      <Text>View top users and statistics</Text>
    </Box>
  );
}
