"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { CodeCopy } from "@/components/ui/CodeCopy";
import { InfoBox } from "@/components/ui/InfoBox";
import { StickyTopBox } from "@/components/ui/StickyTopBox";
import {
  useUpdateSubname,
  useAccountEnsNames,
  useAccountSubnames,
  Records,
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
import { Address } from "viem";
import { normalize, namehash } from "viem/ens";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import { ResponseTable } from "../indexer/components/ResponseTable";

const WEBHOOK_TYPES = ["generate", "custom"] as const;
type WebhookType = (typeof WEBHOOK_TYPES)[number];

type EnsType = "jan-subname" | "other-subname" | "ens" | "none" | "loading";

export default function WebhooksPage() {
  const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
  const [webhookVisitUrl, setWebhookVisitUrl] = useState<string | null>(null);
  const [webhookType, setWebhookType] = useState<WebhookType>("generate");
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);

  const [ensType, setEnsType] = useState<EnsType>("loading");
  const [accountRecords, setAccountRecords] = useState<Records | null>(null);
  const [yodlRecord, setYodlRecord] = useState<Record<string, any> | null>(null);
  const [updateEnsError, setUpdateEnsError] = useState<string | null>(null);
  const [isUpdatingEns, setIsUpdatingEns] = useState(false);
  const [isEnsUpdated, setIsEnsUpdated] = useState(false);

  const { isConnected, chain } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync, isPending: switchChainPending } = useSwitchChain();

  const { updateSubname } = useUpdateSubname();
  const { accountSubnames, isAccountSubnamesPending } = useAccountSubnames();
  const { accountEnsNames, isAccountEnsNamesPending } = useAccountEnsNames();

  const yodlRecordKey = "me.yodl";

  useEffect(() => {
    if (!isConnected) return;
    if (isAccountSubnamesPending || isAccountEnsNamesPending) {
      setEnsType("loading");
      return;
    }
    const getEnsTypeAndRecords = (): {
      ensType: EnsType;
      records: Records | null;
    } => {
      if (accountSubnames.length) {
        const janSubname = accountSubnames.find((subname) => subname.isJAN);
        if (janSubname) return { ensType: "jan-subname", records: janSubname };
        return { ensType: "other-subname", records: null };
      }
      if (accountEnsNames.length) {
        return { ensType: "ens", records: accountEnsNames[0] };
      }
      return { ensType: "none", records: null };
    };
    const { ensType, records } = getEnsTypeAndRecords();
    setEnsType(ensType);
    setAccountRecords(records);

    if (records === null) return;

    const meYodlRecord = records.sanitizedRecords.allTexts.find((r) => r.key === yodlRecordKey);
    setYodlRecord(meYodlRecord ? JSON.parse(meYodlRecord.value) : null);
  }, [
    isConnected,
    accountSubnames,
    accountEnsNames,
    isAccountSubnamesPending,
    isAccountEnsNamesPending,
  ]);

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
    if (!isConnected || !chain || !accountRecords || ensType === "loading") {
      setUpdateEnsError("Wallet not connected");
      return;
    }

    if (!accountRecords) {
      setUpdateEnsError("No records found"); // fix this
      return;
    }

    if (chain.id !== 1) await switchChainAsync({ chainId: 1 });

    const ensToUpdate = accountRecords.ens;

    const newYodlRecord = JSON.stringify({
      ...yodlRecord,
      webhooks: [...(yodlRecord?.webhooks || []), webhookUrl],
    });

    try {
      if (ensType === "jan-subname") {
        await updateSubname({
          text: { [yodlRecordKey]: newYodlRecord },
          ens: normalize(ensToUpdate),
        });
      } else if (ensType === "ens") {
        await writeContractAsync({
          address: accountRecords.records.resolverAddress as Address,
          abi: [
            {
              inputs: [
                { internalType: "bytes32", name: "node", type: "bytes32" },
                { internalType: "string", name: "key", type: "string" },
                { internalType: "string", name: "value", type: "string" },
              ],
              name: "setText",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          functionName: "setText",
          args: [namehash(ensToUpdate), yodlRecordKey, newYodlRecord],
        });
      }
    } catch (error) {
      setUpdateEnsError("Failed to update ENS record");
      return;
    } finally {
      setIsUpdatingEns(false);
    }
    setYodlRecord({ [yodlRecordKey]: newYodlRecord });
    setIsEnsUpdated(true);
  };

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
              {WEBHOOK_TYPES.map((type) => (
                <Text as="label" size="2" key={type}>
                  <Flex gap="2">
                    <RadioGroup.Item value={type} /> {type}
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
          <Text>
            Current <Code variant="ghost">me.yodl</Code> record for {accountRecords?.ens}:
          </Text>
          <Card size="1">
            <ScrollArea scrollbars="both" className="p-2 w-full max-h-72">
              <ResponseTable data={yodlRecord || "No record found"} />
            </ScrollArea>
          </Card>

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
            </>
          ) : (
            <Text>Connect your wallet to update the ENS record</Text>
          )}
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
        <Text as="p" align="center">
          Receive payments notifications via webhooks.
          <br />
          Configure the <Code>yodl.me</Code> ENS record with webhook URLs.
        </Text>
      </Section>

      <InfoBox>Communities, yapps and users can set their own webhook URLs.</InfoBox>

      <Section size="1">
        <Text as="p" align="center">
          To update the ENS record a wallet with a yodl.eth subname or a regular ENS name must be
          connected.
        </Text>
      </Section>

      <Section size="1">
        <Heading as="h3" size="2" align="center" mb="2" color="gray">
          Get Started
        </Heading>
        <Accordion.Root type="multiple" className="text-sm">
          <Flex direction="column" gap="2">
            {steps.map((step) => (
              <Card key={step.header} size="1">
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
