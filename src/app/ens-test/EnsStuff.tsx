import { getEnsText, normalize, namehash } from "viem/ens";
import { Button, Code, Flex, Text, TextField } from "@radix-ui/themes";
import {
  useEnsText,
  useAccount,
  useSwitchChain,
  useEnsName,
  useEnsResolver,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import { useState, useEffect, useMemo } from "react";
import { getPublicClientByChainId } from "@/lib/viem";
import { Address } from "viem";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  // useIsSubnameAvailable,
  useUpdateSubname,
  UseSubnameUpdateFunctionParams,
  useAccountSubnames,
  usePrimaryName,
  useAddressEnsNames,
  useAccountEnsNames,
  useUpdateChanges,
  useAddSubname,
  useJustaName,
} from "@justaname.id/react";
import { mainnet } from "viem/chains";

const client = getPublicClientByChainId(1);
export const YODL_ENS_DOMAIN = "yodl.eth";

export const EnsStuff = () => {
  const [ensTexts, setEnsTexts] = useState<Record<string, any>>({});
  const [resolverSupport, setResolverSupport] = useState<Record<string, boolean>>({});

  const { switchChainAsync, isPending: switchChainPending } = useSwitchChain(); // wagmi
  const { addSubname } = useAddSubname();
  const { updateSubname, isUpdateSubnamePending: isUpdating } = useUpdateSubname(); // justaname
  // const changeParams = {
  //   ens: normalize("andyoee.eth"),
  //   chainId: mainnet.id,
  //   text: {
  //     ["me.yodl"]: "lalalala",
  //   },
  // };
  // const {
  //   canUpdateEns,
  //   getUpdateChanges,
  //   changes,
  //   checkIfUpdateIsValid,
  //   isUpdateChangesPending: isUpdatingChanges,
  // } = useUpdateChanges(changeParams); // justaname
  // console.log("🚀 changes:", changes);
  // console.log("🚀 canUpdateEns:", canUpdateEns);

  // const updateEns = async () => {
  //   const result = await getUpdateChanges(changeParams);
  //   console.log("🚀 result:", result);
  // };

  // if (canUpdateEns) {
  //   updateEns();
  // }

  // wagmi
  const { address, isConnected, chain } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: resolverAddress } = useEnsResolver({ name: ensName! });
  console.log("🚀 ensName:", ensName);
  console.log("🚀 resolverAddress:", resolverAddress);

  // justaname
  const { primaryName } = usePrimaryName({ address: address });
  // const { addressEnsNames } = useAddressEnsNames({ address: address }); // works but acc better
  const { accountEnsNames } = useAccountEnsNames();
  const { refetchAccountSubnames, accountSubnames } = useAccountSubnames();
  console.log("🚀 primaryName:", primaryName);
  console.log("🚀 accountEnsNames:", accountEnsNames);
  console.log("🚀 accountSubnames:", accountSubnames);
  // const { justaname, backendUrl, routes, chainId, ensDomains } = useJustaName();
  const justanameHook = useJustaName();
  console.log('🚀 justanameHook:', justanameHook);

  const { writeContract, writeContractAsync, isPending: isUpdatingSubname } = useWriteContract();

  const walletClient = useWalletClient();

  useEffect(() => {
    const getEnsTexts = async () => {
      const resolverAddress = await client.getEnsResolver({
        name: normalize("selts.eth"),
      });
      console.log("🚀 resolverAddress:", resolverAddress);
    };
    getEnsTexts();
  }, []);

  const handleUpdateEns = async () => {
    if (!isConnected || !address) {
      console.log("Wallet not connected");
      return;
    }

    const ens = "andyoee.eth";
    // const ens = "andy.yodl.eth";

    try {
      // Check if the resolver exists
      const resolver = await client.getEnsResolver({
        name: normalize(ens),
      });

      if (!resolver) {
        console.error("No resolver found for", ens);
        return;
      }

      // Check if the connected address is the owner
      const owner = await client.getEnsAddress({
        name: normalize(ens),
      });

      if (owner?.toLowerCase() !== address.toLowerCase()) {
        console.error("Connected address is not the owner of", ens);
        console.log("Owner:", owner);
        console.log("Connected address:", address);
        return;
      }

      if (chain?.id !== 1) await switchChainAsync({ chainId: 1 });

      const hasSubname = accountSubnames.length > 0;
      console.log("🚀 hasSubname:", hasSubname);

      const ensText = await client.getEnsText({
        name: normalize(ens),
        key: "me.yodl",
      });
      console.log("🚀 ensText:", ensText);

      const ensTextAsObject: Record<string, any> = ensText ? JSON.parse(ensText) : {};

      console.log("🚀 ensTextAsObject:", ensTextAsObject);

      const newText = {
        "me.yodl": JSON.stringify({
          ...ensTextAsObject,
          webhooks: [...(ensTextAsObject.webhooks || []), "https://webhook.site/1425"],
        }),
      };

      console.log("🚀 newText:", newText);

      const params: UseSubnameUpdateFunctionParams = {
        text: newText,
        ens: normalize(ens),
      };

      // isRegistered
      // ? await updateSubname({
      //     text,
      //     ens: username,
      //   })
      // : await addSubname({
      //     text,
      //     username,
      //     ensDomain: YODL_ENS_DOMAIN,
      //   });

      console.log("🙌🙌🙌 Updating subname");
      // const res = await updateSubname(params);
      const res = await addSubname({
        text: newText,
        username: "lalala1984",
        // ensDomain: YODL_ENS_DOMAIN,
      });
      console.log("🚀 res:", res);

      // await writeContractAsync({
      //   address: resolver,
      //   abi: [
      //     {
      //       inputs: [
      //         { internalType: "bytes32", name: "node", type: "bytes32" },
      //         { internalType: "string", name: "key", type: "string" },
      //         { internalType: "string", name: "value", type: "string" },
      //       ],
      //       name: "setText",
      //       outputs: [],
      //       stateMutability: "nonpayable",
      //       type: "function",
      //     },
      //   ],
      //   functionName: "setText",
      //   args: [namehash(ens), "me.yodl", JSON.stringify(newText)],
      // });
    } catch (error) {
      console.error("🚀 error:", error);
    }
    console.log("🚀 ens:", ens);
  };

  const handleSupportsText = async (resolverAddress: Address) => {
    const supports = await client.readContract({
      address: resolverAddress,
      abi: [
        {
          inputs: [{ internalType: "bytes4", name: "interfaceID", type: "bytes4" }],
          name: "supportsInterface",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "pure",
          type: "function",
        },
      ],
      functionName: "supportsInterface",
      args: ["0x10f13a8c"],
    });
    console.log("🚀 supports:", supports);
  };

  // useEffect(() => {
  //   const getEnsText = async () => {
  //     const ensTextResults = await Promise.all(
  //       ensNames.map(async (ensName) => {
  //         const resolverAddress = await client.getEnsResolver({
  //           name: normalize(ensName),
  //         });
  //         console.log("🚀 resolverAddress:", resolverAddress);

  //         // Check if resolver supports text records
  //         let supportsText = false;
  //         if (resolverAddress) {
  //           try {
  //             const supports = await client.readContract({
  //               // address: resolverAddress,
  //               address: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
  //               abi: [
  //                 {
  //                   inputs: [{ internalType: "bytes4", name: "interfaceID", type: "bytes4" }],
  //                   name: "supportsInterface",
  //                   outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //                   stateMutability: "view",
  //                   type: "function",
  //                 },
  //               ],
  //               functionName: "supportsInterface",
  //               args: ["0x10f13a8c"],
  //               // args: ["0x59d1d43c"],
  //               // args: ["0xc7c3268b"],
  //             });
  //             console.log("🚀 supports:", supports);
  //             supportsText = supports as boolean;
  //           } catch (error) {
  //             console.error(`Failed to check interface support for ${ensName}:`, error);
  //           }
  //         }

  //         const ensText = await client.getEnsText({
  //           name: normalize(ensName),
  //           key: "me.yodl",
  //         });
  //         const ensText2 = await client.getEnsText({
  //           name: normalize(ensName),
  //           key: "me.yodl.preferences",
  //         });
  //         console.log("🚀 ensText2:", ensText2);

  //         return { ensName, ensText, resolverAddress, supportsText };
  //       })
  //     );

  //     const textRecord = ensTextResults.reduce(
  //       (acc, { ensName, ensText, resolverAddress, supportsText }) => {
  //         if (ensText) {
  //           acc[ensName] = { ensText, resolverAddress };
  //         }
  //         return acc;
  //       },
  //       {} as Record<string, { ensText: string | object; resolverAddress: string }>
  //     );

  //     // Store resolver support information
  //     const supportRecord = ensTextResults.reduce((acc, { ensName, supportsText }) => {
  //       acc[ensName] = supportsText;
  //       return acc;
  //     }, {} as Record<string, boolean>);

  //     setEnsTexts(textRecord);
  //     setResolverSupport(supportRecord);
  //   };
  //   getEnsText();
  // }, [ensNames]);

  const isLoading = switchChainPending || isUpdating;

  return (
    <Flex direction="column" gap="4">
      {Object.entries(ensTexts).map(([ensName, { ensText, resolverAddress }]) => (
        <Flex key={ensName} direction="column" gap="2">
          <Text>{ensName}</Text>
          <Text>{ensText}</Text>
          <Text>
            <Code>{resolverAddress}</Code>
          </Text>
          <Text>Supports Text Records: {resolverSupport[ensName] ? "Yes" : "No"}</Text>
        </Flex>
      ))}

      <Flex>
        <TextField.Root placeholder="Resolver Address">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Button onClick={() => handleSupportsText("0x0000000000000000000000000000000000000000")}>
          Test
        </Button>
      </Flex>

      <Flex>
        <Button onClick={() => handleUpdateEns()} disabled={!isConnected || isLoading}>
          {isLoading ? (switchChainPending ? "Switching Network..." : "Updating...") : "Update ENS"}
        </Button>
      </Flex>
    </Flex>
  );
};
