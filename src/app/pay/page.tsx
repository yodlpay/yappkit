"use client";

import { Box, Heading, Card, Flex, Link, Text } from "@radix-ui/themes";
import { FaCreditCard, FaChartLine, FaTrophy } from "react-icons/fa";

const PAY_SECTIONS = [
  {
    title: "Close",
    description: "Close the iframe",
    icon: FaChartLine,
    href: "/pay/close",
  },
  {
    title: "Payment",
    description: "Trigger a payment in Yodl UI",
    icon: FaTrophy,
    href: "/pay/payment",
  },
] as const;

export default function DemosPage() {
  return (
    <Box p='4'>
      <Heading size='4' mb='4'>
        Pay
      </Heading>
      <Flex direction='column' gap='3'>
        {PAY_SECTIONS.map(({ title, description, icon: Icon, href }) => (
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
