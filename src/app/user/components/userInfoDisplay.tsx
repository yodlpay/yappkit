import { CodeCopy } from "@/components/ui/CodeCopy";
import { useUserContext } from "@/hooks/useUserContext";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Card, DataList, Flex, Popover, Spinner, Text } from "@radix-ui/themes";

export type UserInfoDisplayItem = {
  label: string;
  description: string;
  element: React.ReactNode;
};

export const UserInfoDisplay = () => {
  const { data: userContext, isLoading } = useUserContext();

  if (isLoading)
    return (
      <Flex justify="center" align="center" width="100%" gap="2" mt="6">
        <Spinner />
        <Text>Loading...</Text>
      </Flex>
    );

  if (!userContext)
    return (
      <Callout.Root color="red" mt="6">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>Open this yapp through the Yodl app to fetch user context.</Callout.Text>
      </Callout.Root>
    );

  const { address, primaryEnsName, community } = userContext;

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
      element: <CodeCopy text={primaryEnsName || "n/a"} truncate={true} />,
    },

    {
      label: "Community Address",
      description: "The address of the community.",
      element: <CodeCopy text={community?.address || "n/a"} truncate={true} />,
    },
    {
      label: "Community ENS",
      description:
        "The community from which the yapp was opened. Useful for implementing community specifc features, styling etc.",
      element: <CodeCopy text={community?.ensName || "n/a"} truncate={true} />,
    },
    {
      label: "Community User ENS",
      description: "The ENS name of the user in the community.",
      element: <CodeCopy text={community?.userEnsName || "n/a"} truncate={true} />,
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
