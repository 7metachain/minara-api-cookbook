# Example 04 — Text-to-Swap Transaction

Describe a swap in plain English. Minara parses your intent and returns an executable on-chain transaction payload.

## Quick Start

```bash
# 1. Set your API key in .env

# 2. Run (defaults to "swap 0.1 ETH to USDC" on Base)
npm run example:text-to-swap
```

## Custom Swaps

```bash
# Different intent
npm run example:text-to-swap -- "swap 100 USDC to SOL"

# Specify wallet address and chain
npm run example:text-to-swap -- "swap 0.5 ETH to USDC" "0xYourWallet" "ethereum"
```

## Sample Output

```
🔄 Intent: "swap 0.1 ETH to USDC"
   Wallet: 0x742d...bEb1
   Chain:  base

✅ Swap Transaction Generated
─────────────────────────────────
  ETH → USDC
  Chain: base

📊 Quote:
  Price Impact: -0.03%
  Estimated Gas: 1338000

💰 Tokens:
  ETH: $1960.63
  USDC: $0.99989

📝 Unsigned Transaction (ready to sign):
  To:    0x4409921ae43a39a...
  Value: 100000000000000000
  Gas:   1338000
  Data:  0xf2c42696000000000000000000...

🔐 Approval:
  Required: false
  Allowance is sufficient
```

## What You Get Back

The API returns everything needed to execute the swap:

| Field | Description |
|-------|-------------|
| `intent` | Parsed swap details (tokens, chain, amount) |
| `quote` | Price impact, gas estimate, fees |
| `inputToken` / `outputToken` | Token details with current USD price |
| `unsignedTx` | Ready-to-sign transaction (to, data, value, gas) |
| `approval` | Whether ERC20 approval is needed first |

## Supported Chains

`ethereum`, `base`, `bsc`, `arbitrum`, `optimism` — chain is auto-detected from the token if omitted.

## Next Step

→ [Example 05: Analyze prediction market events](../05-prediction-market/)
