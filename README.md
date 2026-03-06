# Minara API Developer Cookbook

Runnable examples for every [Minara Agent API](https://minara.ai/docs/ecosystem/agent-api) endpoint. Clone, configure, run — in under 5 minutes.

## What's Inside

### Standalone Examples

Each example is a single TypeScript file you can run directly.

| # | Example | Auth | Endpoint | Description |
|---|---------|------|----------|-------------|
| 01 | [Chat (API Key)](examples/01-chat-api-key/) | API Key | `/v1/developer/chat` | Ask anything about crypto — your Hello World |
| 02 | [Chat (x402)](examples/02-chat-x402/) | x402 | `/x402/chat` | Same chat, but pay-per-use with USDC |
| 03 | [Trading Signal](examples/03-trading-signal/) | API Key | `/v1/developer/perp-trading-suggestion` | AI long/short recommendation with entry, SL, TP |
| 04 | [Text-to-Swap](examples/04-text-to-swap/) | API Key | `/v1/developer/intent-to-swap-tx` | Natural language → executable swap transaction |
| 05 | [Prediction Market](examples/05-prediction-market/) | API Key | `/v1/developer/prediction-market-ask` | Analyze Polymarket events with AI |

### Interactive Demo App

A web playground where you can try all endpoints in the browser and copy code snippets.

→ [demo-app/](demo-app/) — Next.js app with live API calls + copyable code

### Guides

| Guide | Description |
|-------|-------------|
| [API Key vs x402](guides/api-key-vs-x402.md) | When to use which authentication method |
| [Common Errors](guides/common-errors.md) | Error codes, causes, and fixes |

---

## Quick Start

### Prerequisites

- **Node.js 18+** ([download](https://nodejs.org/))
- **Minara API Key** — sign up at [minara.ai](https://minara.ai), upgrade to Pro, generate a key under Profile → API tab

### 1. Clone & Install

```bash
git clone https://github.com/your-username/minara-api-cookbook.git
cd minara-api-cookbook
npm install
```

### 2. Configure

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
MINARA_API_KEY=your_api_key_here
```

### 3. Run Your First Example

```bash
npm run example:chat-apikey
```

Expected output:

```
💬 Asking Minara: "What is the current price of BTC?"

🤖 Minara: BTC is currently trading at $98,450...

📎 Chat ID: chat_abc123
```

That's it. You're calling the Minara API.

### 4. Try All Examples

```bash
npm run example:chat-apikey                    # AI Chat
npm run example:chat-x402                      # AI Chat via x402
npm run example:trading-signal                 # Trading signal
npm run example:trading-signal -- ETH          # Signal for ETH
npm run example:text-to-swap                   # Swap transaction
npm run example:prediction-market              # Prediction market
```

### 5. Launch the Demo App

```bash
cd demo-app
cp .env.example .env       # Add your API key
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — try every endpoint in the browser.

---

## API Overview

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/developer/chat` | POST | Conversational AI for crypto analysis |
| `/v1/developer/perp-trading-suggestion` | POST | Long/short signal with entry, SL, TP, confidence |
| `/v1/developer/intent-to-swap-tx` | POST | Natural language → on-chain swap payload |
| `/v1/developer/prediction-market-ask` | POST | AI probability analysis of Polymarket events |

### Two Ways to Authenticate

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  API Key (Subscription)         x402 (Pay-per-Use)          │
│  ─────────────────────          ──────────────────          │
│  api-developer.minara.ai        x402.minara.ai              │
│  Authorization: Bearer KEY      USDC payment via wallet     │
│  Pro/Partner plan required      No account needed           │
│  Credits deducted               Pay per request             │
│                                                             │
│  → Best for backends            → Best for user-facing      │
│    and scheduled tasks            apps and AI agents        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Read the full comparison: [API Key vs x402 Guide](guides/api-key-vs-x402.md)

---

## Project Structure

```
minara-api-cookbook/
├── README.md               ← You are here
├── .env.example             ← Template for your API keys
├── package.json             ← Dependencies for examples
├── tsconfig.json
│
├── examples/
│   ├── 01-chat-api-key/     ← Simplest Hello World
│   ├── 02-chat-x402/        ← Same, with x402 payment
│   ├── 03-trading-signal/   ← Perp trading suggestion
│   ├── 04-text-to-swap/     ← Intent → swap transaction
│   └── 05-prediction-market/← Polymarket analysis
│
├── demo-app/                ← Interactive web playground
│   ├── src/app/
│   │   ├── api/             ← Proxy routes (keeps API key server-side)
│   │   ├── panels/          ← UI panels for each endpoint
│   │   └── page.tsx         ← Main playground page
│   └── README.md
│
└── guides/
    ├── api-key-vs-x402.md   ← Which auth to use when
    └── common-errors.md     ← Troubleshooting guide
```

---

## Resources

- [Minara Agent API Documentation](https://minara.ai/docs/ecosystem/agent-api)
- [API Reference (API Key)](https://minara.ai/docs/ecosystem/agent-api/api-reference/api-reference-api-key)
- [API Reference (x402)](https://minara.ai/docs/ecosystem/agent-api/api-reference/api-reference-x402)
- [x402 Protocol](https://www.x402.org/)
- [Minara CLI](https://github.com/Minara-AI/minara-cli) — official CLI tool

## License

MIT
