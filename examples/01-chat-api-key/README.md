# Example 01 — Chat with API Key

The simplest Minara API integration. Send a question, get an AI-powered crypto analysis.

## Quick Start

```bash
# 1. Set your API key
cp ../../.env.example ../../.env
# Edit .env → fill in MINARA_API_KEY

# 2. Install dependencies (from repo root)
npm install

# 3. Run
npm run example:chat-apikey
```

## Custom Question

```bash
npm run example:chat-apikey -- "Analyze ETH price action this week"
```

## How It Works

A single `POST` to `/v1/developer/chat`:

```typescript
const response = await fetch("https://api-developer.minara.ai/v1/developer/chat", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${YOUR_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    mode: "fast",        // "fast" or "expert"
    stream: false,       // true for SSE streaming
    message: { role: "user", content: "What is the price of BTC?" },
  }),
});
```

## Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `mode` | `"fast"` / `"expert"` | Fast for quick answers, expert for deep analysis |
| `stream` | `true` / `false` | Enable Server-Sent Events for streaming responses |

## Next Step

→ [Example 02: Same feature, but with x402 pay-per-use (no API key needed)](../02-chat-x402/)
