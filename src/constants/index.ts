import { mainnet, polygon, arbitrum, optimism, base } from "viem/chains";

export const SUPPORTED_CHAINS = [mainnet, polygon, arbitrum, optimism, base] as const;

export const YODL_UI_URL = "https://yodl.me";

export const INDEXER_URL = "https://tx.yodl.me/api/v1";

// /api/v1/payments/[txHash]

// https://tx.yodl.me/api

// Endpoints

// // /payments/
// const querySchema = z.object({
//     sender: addressSchema.optional(),
//     receiver: addressSchema.optional(),
//     senderEnsPrimaryName: z.string().optional(),
//     receiverEnsPrimaryName: z.string().optional(),
//     tokenOutSymbols: z.string().optional(),
//     sourceChainIds: z.string().optional(),
//     page: z.coerce.number().min(1).max(1000).default(1),
//     perPage: z.coerce.number().min(1).max(1000).default(100),
//     sortBy: z.enum(['blockTimestamp', 'amountUSD']).default('blockTimestamp'),
//     sortDir: z.enum(['asc', 'desc']).default('desc'),
//   });


// const result = querySchema.safeParse({
//     sender: params.get('sender') || undefined,
//     receiver: params.get('receiver') || undefined,
//     senderEnsPrimaryName: params.get('senderEnsPrimaryName') || undefined,
//     receiverEnsPrimaryName: params.get('receiverEnsPrimaryName') || undefined,
//     tokenOutSymbols: params.get('tokenOutSymbols') || undefined,
//     sourceChainIds: params.get('sourceChainIds') || undefined,
//     page: params.get('page') || undefined,
//     perPage: params.get('perPage') || undefined,
//     sortBy: params.get('sortBy') || undefined,
//     sortDir: params.get('sortDir') || undefined,

// // /payments/[txHash]
// limit default: 10
// const address = ethAddressSchema.parse(params.address);
// const limitParam = new URL(request.url).searchParams.get('limit');
