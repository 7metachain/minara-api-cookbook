# API Key vs x402 — When to Use Which

Minara Agent API offers two authentication methods. This guide helps you choose.

## At a Glance

| | API Key | x402 (Pay-per-Use) |
|---|---|---|
| **Base URL** | `api-developer.minara.ai` | `x402.minara.ai` |
| **Requires account?** | Yes (Pro/Partner plan) | No |
| **Billing** | Credits deducted from account | USDC per request (Base / Solana / Polygon) |
| **Best for** | Backend services, bots, scheduled tasks | User-facing apps, agents, permissionless access |
| **Rate limit** | Per API key | Per wallet address |
| **Setup complexity** | Low (just a header) | Medium (wallet + SDK) |

## Use API Key When...

- **You have a backend service** that calls the API on behalf of your users
- **You want predictable billing** — credits are pre-purchased and consumed
- **You're prototyping** — fastest way to get started
- **Your app has its own user accounts** — you manage billing separately

```typescript
// Simple — just add a header
const response = await fetch("https://api-developer.minara.ai/v1/developer/chat", {
  headers: { Authorization: `Bearer ${API_KEY}` },
  // ...
});
```

## Use x402 When...

- **Your users don't have Minara accounts** — they pay directly with their wallets
- **You're building an AI agent** — the agent pays for its own API calls
- **You want permissionless access** — no signup, no approval, instant access
- **You're building on x402 ecosystem** — composable with other x402 services

```typescript
// Wrap fetch — SDK handles 402 challenges automatically
import { wrapFetchWithPayment } from "@x402/fetch";

const fetchWithPayment = wrapFetchWithPayment(fetch, x402Client);
const response = await fetchWithPayment("https://x402.minara.ai/x402/chat", {
  body: JSON.stringify({ userQuery: "..." }),
  // ...
});
```

## Endpoint Differences

The request body format differs slightly between the two methods:

### Chat

| | API Key | x402 |
|---|---|---|
| Body | `{ mode, stream, message: { role, content } }` | `{ userQuery }` |

### Trading Signal / Text-to-Swap / Prediction Market

Request body is the **same** for both methods — only the base URL and auth differ.

## x402 Chain Endpoints

| Chain | Chat path | Expert path |
|-------|-----------|-------------|
| Base (default) | `/x402/chat` | `/x402/chat/expert` |
| Solana | `/x402/solana/chat` | `/x402/solana/chat/expert` |
| Polygon | `/x402/polygon/chat` | `/x402/polygon/chat/expert` |

## Can I Use Both?

Yes! A common pattern:

- **Backend** uses API Key for batch operations, scheduled analysis, caching
- **Frontend** uses x402 so end users pay per request without needing your API key

```
Your Backend (API Key)          Your Frontend
      │                              │
      ├── Scheduled analysis ───►    │
      ├── Pre-cache popular coins    │
      │                              ├── User asks a question
      │                              ├── x402 payment from user wallet
      │                              └── Direct response to user
```

## Further Reading

- [Getting started with API Key](https://minara.ai/docs/ecosystem/agent-api/getting-started-by-api-key)
- [Getting started with x402](https://minara.ai/docs/ecosystem/agent-api/getting-started-by-x402)
- [x402 Protocol Documentation](https://docs.x402.org/)
