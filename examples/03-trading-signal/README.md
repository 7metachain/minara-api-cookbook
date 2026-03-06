# Example 03 — Perpetual Trading Signal

Get an AI-powered trading recommendation: long or short, entry price, stop loss, take profit, and confidence score.

## Quick Start

```bash
# 1. Set your API key in .env (see root .env.example)

# 2. Run (defaults to BTC, day-trading)
npm run example:trading-signal
```

## Custom Parameters

```bash
# Different symbol
npm run example:trading-signal -- ETH

# Different symbol + style
npm run example:trading-signal -- SOL swing-trading
```

## Sample Output

```
🟢 LONG  BTC
─────────────────────────────────
  Entry:       $98,450
  Take Profit: $102,800
  Stop Loss:   $96,200
  Confidence:  78%

📈 Reasons:
   • BTC broke above key resistance at $97,500 with strong volume
   • RSI at 62 indicates bullish momentum without being overbought
   • MACD showing bullish crossover on 4H timeframe

⚠️  Risks:
   • Potential pullback at $100,000 psychological resistance
   • High volatility expected around upcoming Fed meeting
```

## Parameters

| Parameter | Type | Default | Options |
|-----------|------|---------|---------|
| `symbol` | string | required | `"BTC"`, `"ETH"`, `"SOL"`, etc. |
| `style` | string | `"scalping"` | `"scalping"`, `"day-trading"`, `"swing-trading"` |
| `marginUSD` | number | `1000` | Your margin amount in USD |
| `leverage` | number | `10` | 1–40x |
| `strategy` | string | `"max-profit"` | More strategies coming soon |

## Next Step

→ [Example 04: Convert natural language to a swap transaction](../04-text-to-swap/)
