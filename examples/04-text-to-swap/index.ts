/**
 * Example 04 — Text-to-Swap Transaction
 *
 * Describe a swap in plain English and Minara converts it into
 * an executable on-chain transaction payload (compatible with OKX DEX).
 */

import "dotenv/config";

const MINARA_API_KEY = process.env.MINARA_API_KEY;
if (!MINARA_API_KEY) {
  console.error("❌ Missing MINARA_API_KEY in .env file");
  process.exit(1);
}

const intent = process.argv[2] || "swap 0.1 ETH to USDC";
const walletAddress = process.argv[3] || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1";
const chain = process.argv[4] || "base";

console.log(`\n🔄 Intent: "${intent}"`);
console.log(`   Wallet: ${walletAddress}`);
console.log(`   Chain:  ${chain}\n`);

const response = await fetch(
  "https://api-developer.minara.ai/v1/developer/intent-to-swap-tx",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MINARA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ intent, walletAddress, chain }),
  }
);

if (!response.ok) {
  console.error(`❌ API error: ${response.status}`);
  const body = await response.text();
  console.error(body);
  process.exit(1);
}

const data = await response.json();

console.log("✅ Swap Transaction Generated");
console.log(`─────────────────────────────────`);

if (data.intent) {
  console.log(`  ${data.intent.inputTokenSymbol} → ${data.intent.outputTokenSymbol}`);
  console.log(`  Chain: ${data.intent.chain}`);
}

if (data.quote) {
  console.log(`\n📊 Quote:`);
  console.log(`  Price Impact: ${data.quote.priceImpact}%`);
  console.log(`  Estimated Gas: ${data.quote.estimatedGas}`);
}

if (data.inputToken && data.outputToken) {
  console.log(`\n💰 Tokens:`);
  console.log(`  ${data.inputToken.symbol}: $${data.inputToken.unitPrice}`);
  console.log(`  ${data.outputToken.symbol}: $${data.outputToken.unitPrice}`);
}

if (data.unsignedTx) {
  console.log(`\n📝 Unsigned Transaction (ready to sign):`);
  console.log(`  To:    ${data.unsignedTx.to}`);
  console.log(`  Value: ${data.unsignedTx.value}`);
  console.log(`  Gas:   ${data.unsignedTx.gas}`);
  console.log(`  Data:  ${data.unsignedTx.data?.slice(0, 42)}...`);
}

if (data.approval) {
  console.log(`\n🔐 Approval:`);
  console.log(`  Required: ${data.approval.isRequired}`);
  console.log(`  ${data.approval.message}`);
}

console.log();
