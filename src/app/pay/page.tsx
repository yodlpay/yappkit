import { Box, Card, Flex, Link, Text } from "@radix-ui/themes";
import { FaChartLine, FaTrophy } from "react-icons/fa";
import { PageHeader } from "@/components/PageHeader";

const PAY_SECTIONS = [
  {
    title: "Close",
    description: "How to close iframe and return the main app",
    icon: FaChartLine,
    href: "/pay/close",
  },
  {
    title: "Payments",
    description: "Make payments on yodl.me",
    icon: FaTrophy,
    href: "/pay/payments",
  },
] as const;

export default function PayPage() {
  return (
    <>
      <PageHeader title='Pay' backPath='/' />
      <Flex direction='column' gap='3' maxWidth='500px' mx='auto'>
        {PAY_SECTIONS.map(({ title, description, icon: Icon, href }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <Card>
              <Flex align='center' gap='3'>
                <Icon size={24} />
                <Box>
                  <Text as='p' size='3' weight='bold'>
                    {title}
                  </Text>
                  <Text as='p' color='gray' size='2'>
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
