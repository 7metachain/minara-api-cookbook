/**
 * Example 05 — Prediction Market Analysis
 *
 * Pass a Polymarket event URL and get AI-estimated probabilities
 * for each outcome, with detailed reasoning.
 */

import "dotenv/config";

const MINARA_API_KEY = process.env.MINARA_API_KEY;
if (!MINARA_API_KEY) {
  console.error("❌ Missing MINARA_API_KEY in .env file");
  process.exit(1);
}

const link =
  process.argv[2] ||
  "https://polymarket.com/event/will-there-be-another-us-government-shutdown-by-january-31";

const mode = (process.argv[3] as "fast" | "expert") || "fast";

console.log(`\n🔮 Analyzing prediction market event...`);
console.log(`   URL:  ${link}`);
console.log(`   Mode: ${mode}\n`);

const response = await fetch(
  "https://api-developer.minara.ai/v1/developer/prediction-market-ask",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MINARA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link,
      mode,
      only_result: false,
    }),
  }
);

if (!response.ok) {
  console.error(`❌ API error: ${response.status}`);
  const body = await response.text();
  console.error(body);
  process.exit(1);
}

const data = await response.json();

if (data.predictions?.length) {
  console.log("📊 Predictions:");
  console.log(`─────────────────────────────────`);

  for (const p of data.predictions) {
    const bar = "█".repeat(Math.round(p.yesProb * 20));
    const empty = "░".repeat(20 - Math.round(p.yesProb * 20));
    console.log(`  ${p.outcome}`);
    console.log(`    Yes: ${bar}${empty} ${(p.yesProb * 100).toFixed(1)}%`);
    console.log(`    No:  ${(p.noProb * 100).toFixed(1)}%`);
    console.log();
  }
}

if (data.reasoning) {
  console.log("💡 Reasoning:");
  console.log(`─────────────────────────────────`);
  console.log(data.reasoning);
}

console.log();
