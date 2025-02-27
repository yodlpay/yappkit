"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { CodeCopy } from "@/components/ui/CodeCopy";
import { InfoBox } from "@/components/ui/InfoBox";
import { Loader } from "@/components/ui/Loader";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import { getPublicClientByChainId } from "@/lib/viem";
import { useUser } from "@/providers/UserProviders";
import {
  UseSubnameUpdateFunctionParams,
  useUpdateSubname,
  useSubname,
  useAddressEnsNames,
  useAccountEnsNames,
  useAccountSubnames,
  Records as AccountSubname,
} from "@justaname.id/react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  Link,
  ScrollArea,
  RadioGroup,
  TextField,
  Section,
  Code,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { useAccount, useEnsName, useSwitchChain } from "wagmi";

type WebhookType = "generate" | "custom";

const webhookTypes: { label: string; value: WebhookType }[] = [
  {
    label: "Generate",
    value: "generate",
  },
  {
    label: "Custom",
    value: "custom",
  },
];

export default function WebhooksPage() {
  const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
  console.log("🚀 webhookUrl:", webhookUrl);
  const [webhookVisitUrl, setWebhookVisitUrl] = useState<string | null>(null);
  const [webhookType, setWebhookType] = useState<WebhookType>("generate");
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);
  const [meYodlRecord, setMeYodlRecord] = useState<Record<string, any> | null>(null);
  const [updateEnsError, setUpdateEnsError] = useState<string | null>(null);
  const [isUpdatingEns, setIsUpdatingEns] = useState(false);
  const [isEnsUpdated, setIsEnsUpdated] = useState(false);

  const { isConnected, chain, address } = useAccount();
  const { userInfo, isLoading: isUserLoading } = useUser();
  const { switchChainAsync, isPending: switchChainPending } = useSwitchChain();
  const { updateSubname } = useUpdateSubname();

  const { refetchAccountSubnames, accountSubnames } = useAccountSubnames();
  const [subName, setSubName] = useState<AccountSubname | null>(null);
  console.log("🚀 subName:", subName);
  // ens

  useEffect(() => {
    if (!accountSubnames || !address) return;
    const accountSubname = accountSubnames?.find(
      (subname) => subname.sanitizedRecords.ethAddress.value === address
    );
    const meYodlRecord = accountSubname?.sanitizedRecords.allTexts.find((r) => r.key === meYodlKey);

    setSubName(accountSubname || null);
    setMeYodlRecord(meYodlRecord ? JSON.parse(meYodlRecord.value) : null);
  }, [accountSubnames, address]);

  const mainnetClient = getPublicClientByChainId(mainnet.id);
  const meYodlKey = "me.yodl";

  const fetchAndParseEnsText = async (ens: string, key: string) => {
    const ensText = await mainnetClient.getEnsText({
      name: normalize(ens),
      key,
    });
    return ensText ? JSON.parse(ensText) : {};
  };

  // useEffect(() => {
  //   const getMeYodl = async () => {
  //     if (isUserLoading || !userInfo) return;
  //     const meYodlRecordParsed = await fetchAndParseEnsText(userInfo.yappEns, meYodlKey);
  //     console.log("🚀 meYodlRecordParsed:", meYodlRecordParsed);
  //     setMeYodlRecord(meYodlRecordParsed);
  //   };
  //   getMeYodl();
  // }, [userInfo, isUserLoading]);

  if (isUserLoading) return <Loader />;
  if (!userInfo) return null;

  const handleGenerateUrl = async () => {
    setIsLoadingGenerate(true);
    try {
      const response = await fetch("/api/webhook-token", {
        method: "POST",
      });
      const data = await response.json();
      setWebhookUrl(`https://webhook.site/${data.uuid}`);
      setWebhookVisitUrl(`https://webhook.site/#!/view/${data.uuid}`);
    } catch (error) {
      console.error("Failed to generate webhook URL:", error);
    } finally {
      setIsLoadingGenerate(false);
    }
  };

  const handleUpdateEns = async () => {
    setUpdateEnsError(null);
    setIsUpdatingEns(true);
    if (!isConnected || !chain || !subName) {
      setUpdateEnsError("Wallet not connected");
      return;
    }
    if (chain.id !== 1) await switchChainAsync({ chainId: 1 });

    const ensToUpdate = subName.ens;

    const newText = {
      [meYodlKey]: JSON.stringify({
        ...meYodlRecord,
        webhooks: [...(meYodlRecord?.webhooks || []), webhookUrl],
        // webhooks: [...(meYodlRecord?.webhooks || []), "New"],
      }),
    };

    try {
      await updateSubname({
        text: newText,
        ens: normalize(ensToUpdate),
      });
    } catch (error) {
      console.error("🚀 error:", error);
      setUpdateEnsError("Failed to update ENS record");
      return;
    } finally {
      setIsUpdatingEns(false);
    }
    setMeYodlRecord(newText);
    setIsEnsUpdated(true);
  };

  // const justanameSteps = [
  //   "Select your currenct ENS",
  //   "Click on your account in the top right",
  //   "Click 'Profile' --> 'Edit Profile' --> 'Custom'",
  //   "Create a new 'yodl.me' record with the below string or append to the existing one",
  //   "Go 'Back' and 'Save'",
  // ];

  const steps = [
    {
      key: "step-1",
      header: "Step 1: Prepare webhook url",
      content: (
        <Flex direction="column" gap="2">
          <Text size="2">To prepare a url there are two options:</Text>
          <Flex direction="column" gap="2">
            <Flex gap="2">
              <Text>1.</Text>
              <Text>
                Bring your custom endpoint (POST). Choose this option to keep receiving webhooks
                until the ENS record is changed or removed.
                <br />
                This requires a live REST api. Learn more{" "}
                <Link
                  href="https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/"
                  target="_blank"
                >
                  here
                </Link>
              </Text>
            </Flex>
            <Flex gap="2">
              <Text>2.</Text>
              <Text>
                Generate a disposable url. This will create a temporary endpoint on{" "}
                <Link href="https://webhook.site" target="_blank">
                  webhook.site
                </Link>{" "}
                that expires in 24 hours. Choose this option for simple testing.
              </Text>
            </Flex>
          </Flex>

          <RadioGroup.Root
            size="1"
            defaultValue="generate"
            onValueChange={(value) => setWebhookType(value as WebhookType)}
          >
            <Flex gap="4">
              {webhookTypes.map((type) => (
                <Text as="label" size="2" key={type.value}>
                  <Flex gap="2">
                    <RadioGroup.Item value={type.value} /> {type.label}
                  </Flex>
                </Text>
              ))}
            </Flex>
          </RadioGroup.Root>

          {webhookType === "generate" ? (
            <Button onClick={handleGenerateUrl} disabled={isLoadingGenerate}>
              {isLoadingGenerate ? "Generating..." : "Generate URL"}
            </Button>
          ) : (
            <TextField.Root
              placeholder="https://your-endpoint.com/webhook"
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          )}

          {webhookUrl && (
            <Flex direction="column" gap="2">
              <ScrollArea scrollbars="horizontal" className="text-xs py-1">
                <CodeCopy text={webhookUrl} position="back" justify="start" />
              </ScrollArea>
              {webhookType === "generate" && (
                <Link size="2" href={webhookVisitUrl!} target="_blank">
                  Visit webhook
                </Link>
              )}
            </Flex>
          )}
        </Flex>
      ),
    },
    {
      key: "step-2",
      header: "Step 2: Configure ENS Record",
      content: (
        <Flex direction="column" gap="2">
          <Text size="2">
            yodl.eth subnames can be configured with the me.yodl ENS record.
            <br />
            This contains chain and token preferences if configured and is also the record used to
            configure webhooks.
          </Text>
          <Text>Current me.yodl record for {subName?.ens}:</Text>
          <Code>
            {JSON.stringify(meYodlRecord, null, 2)}
            {/* {Object.entries(meYodl || {})
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")} */}
          </Code>

          {isConnected ? (
            <>
              <Text>
                Click the button below to add or append the new webhook url to the me.yodl record.
              </Text>

              <Button
                onClick={handleUpdateEns}
                disabled={isUpdatingEns || switchChainPending || !webhookUrl}
              >
                {isUpdatingEns || switchChainPending ? "Updating..." : "Update ENS Record"}
              </Button>
              {!webhookUrl && (
                <Text size="1" color="red">
                  Generate a URL in Step 1 to update the record
                </Text>
              )}
              {updateEnsError && <Text color="red">{updateEnsError}</Text>}
              {isEnsUpdated && <Text color="green">ENS record updated</Text>}

              {/* {justanameSteps.map((step, idx) => (
                <Flex key={step} gap="2">
                  <Text size="2">{idx + 2}.</Text>
                  <Text size="2">{step}.</Text>
                </Flex>
              ))} */}
            </>
          ) : (
            <Text>Connect your wallet to update the ENS record</Text>
          )}

          {/* {webhookUrl ? (
            <ScrollArea scrollbars="horizontal" className="text-xs py-1">
              <CodeCopy text={`"webhooks": ["${webhookUrl}"]`} position="back" justify="start" />
            </ScrollArea>
          ) : (
            <InfoBox color="gray">
              <Text>Generate a URL to get the yodl.me record</Text>
            </InfoBox>
          )} */}
        </Flex>
      ),
    },
    {
      key: "step-3",
      header: "Step 3: Receive and inspect",
      content: (
        <>
          <Flex gap="2">
            <Text size="2">1.</Text>
            <Text size="2">You are now set up to receive notifications.</Text>
          </Flex>
          <Flex gap="2">
            <Text size="2">2.</Text>
            <Text size="2">
              Send yourself a payment to test it <Link href="./pay">here</Link>.
            </Text>
          </Flex>
          <Flex gap="2">
            <Text size="2">3.</Text>
            <Text size="2">
              Inspect the webhook notification
              {webhookType === "generate" && (
                <Link href={webhookVisitUrl!} target="_blank">
                  {" "}
                  here
                </Link>
              )}
              .
            </Text>
          </Flex>
        </>
      ),
    },
  ];

  return (
    <>
      <StickyTopBox>
        <PageHeader title="Webhooks" backPath="/" />
      </StickyTopBox>

      <Section size="1">
        <Text as="p" align="center" size="3" className="text-center">
          Receive payments notifications via webhooks.
          <br />
          Configure the <Code>yodl.me</Code> ENS record with webhook URLs.
        </Text>
      </Section>

      <Flex direction="column" gap="2">
        <InfoBox>Communities, yapps and users can set their own webhook URLs.</InfoBox>

        <Text>TODO: Show local state webhook, logged in subname and yodl.me.webhooks here.</Text>
      </Flex>

      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Get Started
        </Heading>
        <Accordion.Root type="single" collapsible className="text-sm">
          <Flex direction="column" gap="2">
            {steps.map((step) => (
              <Card key={step.header}>
                <Accordion.Item value={step.header} className="w-full">
                  <Flex direction="column" gap="2">
                    <Accordion.Header>
                      <Accordion.Trigger className="group w-full">
                        <Flex justify="between" align="center" gap="2">
                          <Heading as="h3" size="2">
                            {step.header}
                          </Heading>
                          <ChevronDownIcon
                            className="group-data-[state=open]:rotate-180"
                            aria-hidden
                          />
                        </Flex>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>{step.content} </Accordion.Content>
                  </Flex>
                </Accordion.Item>
              </Card>
            ))}
          </Flex>
        </Accordion.Root>
      </Section>
    </>
  );
}
