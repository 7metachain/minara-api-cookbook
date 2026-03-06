# Example 05 — Prediction Market Analysis

Analyze a Polymarket event and get AI-estimated probabilities for each outcome with reasoning.

## Quick Start

```bash
# 1. Set your API key in .env

# 2. Run with a default Polymarket event
npm run example:prediction-market
```

## Custom Events

```bash
# Analyze any Polymarket event
npm run example:prediction-market -- "https://polymarket.com/event/your-event-slug"

# Use expert mode for deeper analysis
npm run example:prediction-market -- "https://polymarket.com/event/your-event-slug" expert
```

## Sample Output

```
🔮 Analyzing prediction market event...
   URL:  https://polymarket.com/event/...
   Mode: fast

📊 Predictions:
─────────────────────────────────
  Donald Trump
    Yes: █████████████░░░░░░░░ 65.0%
    No:  35.0%

  Kamala Harris
    Yes: ██████░░░░░░░░░░░░░░ 30.0%
    No:  70.0%

💡 Reasoning:
─────────────────────────────────
Based on recent polling data and historical trends...
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `link` | string | Yes | Polymarket event URL |
| `mode` | string | Yes | `"fast"` or `"expert"` |
| `only_result` | boolean | No | Skip reasoning, return only probabilities |
| `customPrompt` | string | No | Guide the analysis focus |

## Using `customPrompt`

Add custom instructions to shape the analysis:

```typescript
body: JSON.stringify({
  link: "https://polymarket.com/event/...",
  mode: "expert",
  only_result: false,
  customPrompt: "Focus on recent news sentiment. Be conservative in estimates."
})
```

## Next Step

→ [Demo App: Interactive web playground for all endpoints](../../demo-app/)
