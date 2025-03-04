import { CodeCopy } from "@/components/ui/CodeCopy";
import { FullScreenLoader } from "@/components/ui/Loader";
import { useUser } from "@/providers/UserProviders";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Card, DataList, Flex, Popover, Text } from "@radix-ui/themes";

export type UserInfoDisplayItem = {
  label: string;
  description: string;
  element: React.ReactNode;
};

export const UserInfoDisplay = () => {
  const { userInfo, isLoading } = useUser();

  if (isLoading) return <FullScreenLoader />;
  if (!userInfo) return null;

  const { ens, yappEns, communityEns, exp, address } = userInfo;
  const expirationDate = new Date(userInfo.exp * 1000);
  const formattedExpDate = `${userInfo.exp} (${expirationDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })})`;

  const userInfoDisplayItems: UserInfoDisplayItem[] = [
    {
      label: "Address",
      description:
        "The connected wallet address of the user in the Yodl app. Useful for looking up token balances, payments, etc.",
      element: <CodeCopy text={address} truncate={true} />,
    },
    {
      label: "Ens",
      description:
        "The connected ENS name of the user in the Yodl app. Useful for looking up ENS records, e.g. Yodl settings including preferred tokens and chains.",
      element: <CodeCopy text={ens || "n/a"} truncate={true} />,
    },
    {
      label: "Yapp",
      description:
        "This yapp's ENS name. It must match the SDK config.ensName. Essential in rejecting malicious JWT's. The SDK's verify function handles the check.",
      element: <CodeCopy text={yappEns} truncate={true} />,
    },
    {
      label: "Community",
      description:
        "The community from which the yapp was opened. Useful for implementing community specifc features, styling etc.",
      element: <CodeCopy text={communityEns} truncate={true} />,
    },
    {
      label: "Token Exp.",
      description: "The JWT expiry time as a unix timestamp.",
      element: <Text>{formattedExpDate}</Text>,
    },
  ];
  return (
    <Card size="1">
      <DataList.Root>
        {userInfoDisplayItems.map((item, index) => (
          <DataList.Item key={index} align="center">
            <Popover.Root>
              <Popover.Trigger>
                <DataList.Label minWidth="88px">
                  <Flex align="center" gap="1">
                    <InfoCircledIcon color="teal" />
                    {item.label}:
                  </Flex>
                </DataList.Label>
              </Popover.Trigger>
              <Popover.Content size="1" maxWidth="300px">
                <Text size="1">{item.description}</Text>
              </Popover.Content>
            </Popover.Root>
            <DataList.Value>{item.element}</DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Card>
  );
};
