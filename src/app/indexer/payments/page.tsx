"use client";

import { PageHeader } from "@/components/PageHeader";
import { INDEXER_URL } from "@/constants";
import { Box, Button, Code, Flex, Section, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function TransactionsPage() {
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<any>(null);
  const [responseStatusCode, setResponseStatusCode] = useState<number | null>(null);

  const inputs = [
    {
      label: "Sender",
      key: "sender",
      placeholder: "Sender ENS or Address",
    },
    {
      label: "Receiver",
      key: "receiver",
      placeholder: "Receiver ENS or Address",
    },
    {
      label: "Tokens",
      key: "tokenOutSymbols",
      placeholder: "Token Sent Symbols, e.g. ETH, USDC",
    },
    {
      label: "Chain Ids",
      key: "sourceChainIds",
      placeholder: "Source Chain Ids, e.g. 1, 137",
      type: "dropdown",
    },
  ];

  const buildQueryString = () => {
    const params = new URLSearchParams();
    // Only add params that have values
    Object.entries(queryParams).forEach(([key, value]) => {
      let keyToUse = key;
      if (["sender", "receiver"].includes(key)) {
        keyToUse = value.startsWith("0x") ? key : key + "EnsPrimaryName";
      }
      console.log("🚀  value:", value);
      if (value && value.toString().trim() !== "") {
        params.append(keyToUse, value);
      }
    });
    return params.toString() ? `?${params.toString()}&perPage=5` : "";
  };

  const isValidRequest = () => {
    // Enable only if sender or receiver is provided
    return ["sender", "receiver"].some(key => queryParams[key] && queryParams[key].toString().trim() !== "");
  };

  const handleSubmit = async () => {
    setResponseStatusCode(null);
    setResponse(null);
    const queryString = buildQueryString();
    const url = `${INDEXER_URL}/payments${queryString}`;
    console.log("🚀  url:", url);
    const response = await fetch(url);
    setResponseStatusCode(response.status);
    console.log("🚀  response:", response);
    const data = await response.json();
    console.log(data);
    setResponse(data);
  };

  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, [key]: e.target.value });
  };

  return (
    <Box>
      <PageHeader title='API Playground' backPath='/indexer' />

      <Section size='1'>
        <Flex direction='column' gap='2' align='start'>
          {inputs.map((input, index) => (
            <Flex key={input.label} direction='column' gap='1' width='100%'>
              <Text size='2'>{input.label}</Text>
              <TextField.Root size='1' placeholder={input.placeholder} value={queryParams[input.key]} onChange={handleInputChange(input.key)}>
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Flex>
          ))}

          <Button size='3' disabled={!isValidRequest()} onClick={handleSubmit}>
            Send Request
          </Button>
        </Flex>
      </Section>

      <Section size='1'>
        <Flex direction='column' gap='2' align='start'>
          <Flex gap='2' justify='between' align='center' width='100%'>
            <Flex gap='2' align='center'>
              <Text size='2'>Response:</Text>
              {responseStatusCode && (
                <Code color={responseStatusCode >= 200 && responseStatusCode < 300 ? "green" : "red"} size='2'>
                  {responseStatusCode}
                </Code>
              )}
            </Flex>
            <Button size='1' variant='outline' color='gray' onClick={() => setResponse(null)}>
              Clear
            </Button>
          </Flex>
          <Text size='2'>{response ? JSON.stringify(response, null, 2) : ""}</Text>
        </Flex>
      </Section>
    </Box>
  );
}
