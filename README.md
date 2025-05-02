# YappKit

A comprehensive developer kit for building mini-apps (yapps) using the Yodl protocol. This project serves as a reference implementation and showcases the capabilities of the yapp SDK.

## Features

- **Payment Integration**: Learn how to implement Yodl payments in your yapp
- **Wallet Connection**: Examples of wallet connection and on-chain transactions
- **Webhook Handling**: Implement webhook endpoints for payment notifications
- **Indexer API**: Query and display payment data using the Indexer API
- **SDK Integration**: Full integration with the yapp SDK for seamless parent app communication

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

- `/app` - Next.js app router pages
  - `/pay` - Payment implementation examples
  - `/connect` - Wallet connection examples
  - `/webhooks` - Webhook endpoint implementations
  - `/indexer` - Indexer API integration examples
  - `/user` - User-related pages

## Dependencies

- `@yodlpay/yapp-sdk` - Core SDK for yapp development
- `@yodlpay/tokenlists` - Token list utilities
- `@radix-ui/themes` - UI component library
- `@rainbow-me/rainbowkit` - Wallet connection
- `@tanstack/react-query` - Data fetching
- `viem` - Ethereum interaction
- `wagmi` - Web3 hooks

## Environment Variables

Rename `.env.example` file to `.env.local` and set the variables:

## Learn More

- [Yodl Protocol Documentation](https://yodlpay.notion.site/Yodl-Docs-1dec9d2d41c4808b9b06c218f2dcf658)
- [Yapp SDK Repo and Documentation](https://github.com/yodlpay/yapp-sdk)
- [Yappkit Github Repo](https://github.com/yodlpay/yappkit)
- [Yappkit Website](https://yappkit.vercel.app)
- [Next.js Documentation](https://nextjs.org/docs)
