# Minara API Developer Cookbook

<p align="center">
  <img src="assets/banner.png" alt="Minara API Developer Cookbook" width="100%" />
</p>

> Runnable examples for every [Minara Agent API](https://minara.ai/docs/ecosystem/agent-api) endpoint. Clone, configure, run — in under 5 minutes.

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

A developer-first collection of code examples covering all Minara Agent API endpoints, with both **API Key** and **x402 (pay-per-use)** authentication methods. Includes a web playground for interactive testing.

### What's Inside

| # | Example | Auth | Endpoint | Description |
|---|---------|------|----------|-------------|
| 01 | [Chat (API Key)](examples/01-chat-api-key/) | API Key | `/v1/developer/chat` | Ask anything about crypto — your Hello World |
| 02 | [Chat (x402)](examples/02-chat-x402/) | x402 | `/x402/chat` | Same chat, but pay-per-use with USDC |
| 03 | [Trading Signal](examples/03-trading-signal/) | API Key | `/v1/developer/perp-trading-suggestion` | AI long/short recommendation with entry, SL, TP |
| 04 | [Text-to-Swap](examples/04-text-to-swap/) | API Key | `/v1/developer/intent-to-swap-tx` | Natural language → executable swap transaction |
| 05 | [Prediction Market](examples/05-prediction-market/) | API Key | `/v1/developer/prediction-market-ask` | Analyze Polymarket events with AI |

**Also included:**

- [**Demo App**](demo-app/) — Interactive Next.js web playground with live API calls + copyable code snippets
- [**API Key vs x402 Guide**](guides/api-key-vs-x402.md) — When to use which authentication method
- [**Common Errors Guide**](guides/common-errors.md) — Error codes, causes, and fixes

## Quick Start

### Prerequisites

- **Node.js 18+** ([download](https://nodejs.org/))
- **Minara API Key** — sign up at [minara.ai](https://minara.ai), upgrade to Pro, generate a key under Profile → API tab

### 1. Clone & Install

```bash
git clone https://github.com/7metachain/minara-api-cookbook.git
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

### 4. Try All Examples

```bash
npm run example:chat-apikey                    # AI Chat
npm run example:chat-x402                      # AI Chat via x402
npm run example:trading-signal                 # Trading signal (BTC default)
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

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/developer/chat` | POST | Conversational AI for crypto analysis |
| `/v1/developer/perp-trading-suggestion` | POST | Long/short signal with entry, SL, TP, confidence |
| `/v1/developer/intent-to-swap-tx` | POST | Natural language → on-chain swap payload |
| `/v1/developer/prediction-market-ask` | POST | AI probability analysis of Polymarket events |

### Authentication Methods

| | API Key | x402 (Pay-per-Use) |
|---|---|---|
| **Base URL** | `api-developer.minara.ai` | `x402.minara.ai` |
| **Auth** | `Authorization: Bearer <KEY>` | USDC payment via wallet |
| **Account required?** | Yes (Pro/Partner plan) | No |
| **Billing** | Credits deducted from account | Pay per request in USDC |
| **Best for** | Backend services, bots, scheduled tasks | User-facing apps, AI agents |

Read the full comparison: [API Key vs x402 Guide](guides/api-key-vs-x402.md)

## Project Structure

```
minara-api-cookbook/
├── examples/
│   ├── 01-chat-api-key/          # Simplest Hello World
│   ├── 02-chat-x402/             # Same feature, x402 payment
│   ├── 03-trading-signal/        # Perp trading suggestion
│   ├── 04-text-to-swap/          # Intent → swap transaction
│   └── 05-prediction-market/     # Polymarket analysis
├── demo-app/                     # Interactive Next.js web playground
│   ├── src/app/api/              # Proxy routes (API key stays server-side)
│   ├── src/app/panels/           # UI panel per endpoint
│   └── src/components/           # CodeBlock, ResponseBlock
├── guides/
│   ├── api-key-vs-x402.md        # Authentication comparison
│   └── common-errors.md          # Troubleshooting reference
├── .env.example                  # API key template
├── package.json                  # Dependencies for CLI examples
└── tsconfig.json
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| CLI Examples | TypeScript + tsx runner |
| x402 Integration | @x402/fetch, @x402/evm, viem |
| Demo App | Next.js 16, React 19, Tailwind CSS 4 |
| Language | TypeScript 5 |

## Resources

- [Minara Agent API Documentation](https://minara.ai/docs/ecosystem/agent-api)
- [API Reference (API Key)](https://minara.ai/docs/ecosystem/agent-api/api-reference/api-reference-api-key)
- [API Reference (x402)](https://minara.ai/docs/ecosystem/agent-api/api-reference/api-reference-x402)
- [x402 Protocol](https://www.x402.org/)
- [Minara CLI](https://github.com/Minara-AI/minara-cli) — Official CLI tool

## License

MIT
