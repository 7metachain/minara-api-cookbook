# Minara API Playground (Demo Web App)

An interactive web app where you can try every Minara API endpoint, see the response, and copy the code snippet into your own project.

## Quick Start

```bash
# 1. Set up environment
cp .env.example .env
# Edit .env → fill in MINARA_API_KEY

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

| Tab | Endpoint | What it does |
|-----|----------|-------------|
| AI Chat | `/v1/developer/chat` | Ask any crypto question |
| Trading Signal | `/v1/developer/perp-trading-suggestion` | Get long/short recommendation |
| Text-to-Swap | `/v1/developer/intent-to-swap-tx` | Natural language → swap transaction |
| Prediction Market | `/v1/developer/prediction-market-ask` | Analyze Polymarket events |

Each tab shows:
- **Input form** — fill in parameters and send the request
- **Live response** — see the actual API response JSON
- **Code snippet** — copy-paste ready code that updates as you change inputs

## Architecture

```
Browser (React)                    Next.js Server                    Minara API
     │                                  │                                │
     ├─── POST /api/chat ─────────────►│                                │
     │    { message, mode }             ├─── POST /v1/developer/chat ──►│
     │                                  │    + Authorization: Bearer key │
     │                                  │◄── { content, chatId } ───────┤
     │◄── { content, chatId } ─────────┤                                │
```

The Next.js API routes act as a proxy — your API key stays on the server, never exposed to the browser.

## Tech Stack

- **Next.js 15** — App Router
- **Tailwind CSS 4** — Styling
- **TypeScript** — Type safety
