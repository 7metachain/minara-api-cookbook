# Example 02 — Chat with x402 (Pay-per-Use)

Same chat as Example 01, but using **x402 micropayments** instead of an API key. No Minara account needed.

## Quick Start

```bash
# 1. Set your wallet private key
cp ../../.env.example ../../.env
# Edit .env → fill in EVM_PRIVATE_KEY (wallet with USDC on Base)

# 2. Install dependencies (from repo root)
npm install

# 3. Run
npm run example:chat-x402
```

## How It Works

The x402 SDK wraps `fetch` to handle payment challenges automatically:

```typescript
import { wrapFetchWithPayment } from "@x402/fetch";
import { x402Client } from "@x402/core/client";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { toClientEvmSigner } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

// Create signer: account + public client for on-chain reads
const account = privateKeyToAccount(process.env.EVM_PRIVATE_KEY as `0x${string}`);
const publicClient = createPublicClient({ chain: base, transport: http() });
const signer = toClientEvmSigner(account, publicClient);

// Set up x402 client
const client = new x402Client();
registerExactEvmScheme(client, { signer });

// Wrap fetch — payment is automatic
const fetchWithPayment = wrapFetchWithPayment(fetch, client);

// Use it like normal fetch — SDK handles the 402 challenge + USDC payment
const response = await fetchWithPayment("https://x402.minara.ai/x402/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userQuery: "What is the price of BTC?" }),
});
```

## What Happens Under the Hood

```
Your app                   x402.minara.ai            Blockchain (Base)
   │                            │                         │
   ├─── POST /x402/chat ──────►│                         │
   │                            ├── 402 Payment Required  │
   │◄───────────────────────────┤   (amount, recipient)   │
   │                            │                         │
   │  SDK signs USDC payment    │                         │
   ├─── POST + x-payment ─────►│                         │
   │                            ├── verify payment ──────►│
   │                            │◄── confirmed ───────────┤
   │◄─── 201 + AI response ────┤                         │
```

## API Key vs x402 — Side by Side

| | API Key (Example 01) | x402 (Example 02) |
|---|---|---|
| Endpoint | `api-developer.minara.ai` | `x402.minara.ai` |
| Auth | `Bearer <API_KEY>` header | USDC payment via wallet |
| Account needed? | Yes (Pro/Partner plan) | No |
| Billing | Credits deducted from account | Pay-per-request in USDC |
| Request body | `{ mode, stream, message }` | `{ userQuery }` |

## Supported Chains

x402 payments work on multiple chains. Change the endpoint path:

| Chain | Chat endpoint |
|-------|---------------|
| Base (default) | `/x402/chat` |
| Solana | `/x402/solana/chat` |
| Polygon | `/x402/polygon/chat` |

## Next Step

→ [Example 03: Get AI-powered trading signals](../03-trading-signal/)
