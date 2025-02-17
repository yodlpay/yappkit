import { CodeCopy } from "@/components/CodeCopy";
import { Loader } from "@/components/Loader";
import { useUser } from "@/providers/UserProviders";
import { Badge, Card, Code, DataList, Text } from "@radix-ui/themes";

export type UserInfoDisplayItem = {
  label: string;
  element: React.ReactNode;
};

export const UserInfoDisplay = () => {
  const { userInfo, isLoading } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  if (!userInfo) {
    return null;
  }

  const { ens, truncatedAddress, yappEns, communityEns, exp, someClaim, address } = userInfo;
  const expirationDate = new Date(userInfo.exp * 1000);
  const formattedExpDate = `${userInfo.exp} (${expirationDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })})`;

  const userInfoDisplayItems: UserInfoDisplayItem[] = [
    { label: "Address", element: <CodeCopy  text={address} truncate={true} /> },
    { label: "Ens", element: <CodeCopy text={ens || "n/a"} /> },
    { label: "Yapp", element: <CodeCopy text={yappEns} /> },
    { label: "Community", element: <CodeCopy text={communityEns} /> },
    { label: "Exp", element: <Text>{formattedExpDate}</Text> },
  ];
  return (
    <Card size='2' className='max-w-[600px] mx-auto'>
      <DataList.Root>
        {userInfoDisplayItems.map((item, index) => (
          <DataList.Item key={index} align='center'>
            <DataList.Label minWidth='88px'>{item.label}:</DataList.Label>
            <DataList.Value>{item.element}</DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Card>
  );
};
