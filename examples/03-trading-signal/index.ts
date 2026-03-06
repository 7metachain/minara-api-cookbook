/**
 * Example 03 — Perpetual Trading Signal
 *
 * Get an AI-powered long/short recommendation with entry price,
 * stop loss, take profit, confidence score, and risk analysis.
 */

import "dotenv/config";

const MINARA_API_KEY = process.env.MINARA_API_KEY;
if (!MINARA_API_KEY) {
  console.error("❌ Missing MINARA_API_KEY in .env file");
  process.exit(1);
}

const symbol = process.argv[2] || "BTC";
const style = process.argv[3] || "day-trading";

console.log(`\n📊 Fetching ${style} signal for ${symbol}...\n`);

const response = await fetch(
  "https://api-developer.minara.ai/v1/developer/perp-trading-suggestion",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MINARA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symbol,
      style,
      marginUSD: 1000,
      leverage: 10,
      strategy: "max-profit",
    }),
  }
);

if (!response.ok) {
  console.error(`❌ API error: ${response.status}`);
  const body = await response.text();
  console.error(body);
  process.exit(1);
}

const signal = await response.json();

const arrow = signal.side === "long" ? "🟢 LONG" : "🔴 SHORT";
console.log(`${arrow}  ${symbol}`);
console.log(`─────────────────────────────────`);
console.log(`  Entry:       $${signal.entryPrice?.toLocaleString()}`);
console.log(`  Take Profit: $${signal.takeProfitPrice?.toLocaleString()}`);
console.log(`  Stop Loss:   $${signal.stopLossPrice?.toLocaleString()}`);
console.log(`  Confidence:  ${signal.confidence}%`);
console.log();

if (signal.reasons?.length) {
  console.log("📈 Reasons:");
  signal.reasons.forEach((r: string) => console.log(`   • ${r}`));
  console.log();
}

if (signal.risks?.length) {
  console.log("⚠️  Risks:");
  signal.risks.forEach((r: string) => console.log(`   • ${r}`));
}

console.log();
