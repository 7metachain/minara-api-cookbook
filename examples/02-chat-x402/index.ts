/**
 * Example 02 — Chat with Minara AI using x402 (Pay-per-Use)
 *
 * Same chat functionality as Example 01, but instead of an API key,
 * you pay per request with USDC via the x402 protocol.
 *
 * No Minara account needed — just a wallet with USDC on Base.
 */

import "dotenv/config";
import { wrapFetchWithPayment } from "@x402/fetch";
import { x402Client } from "@x402/core/client";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { toClientEvmSigner } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const EVM_PRIVATE_KEY = process.env.EVM_PRIVATE_KEY;
if (!EVM_PRIVATE_KEY) {
  console.error("❌ Missing EVM_PRIVATE_KEY in .env file");
  console.error("   Use a dev wallet with USDC on Base chain");
  process.exit(1);
}

// Step 1: Create a signer from your wallet private key + a public client for on-chain reads
const account = privateKeyToAccount(EVM_PRIVATE_KEY as `0x${string}`);
const publicClient = createPublicClient({ chain: base, transport: http() });
const signer = toClientEvmSigner(account, publicClient);
console.log(`\n🔑 Wallet: ${account.address}`);

// Step 2: Set up the x402 client with EVM payment scheme
const client = new x402Client();
registerExactEvmScheme(client, { signer });

// Step 3: Wrap the standard fetch — the SDK handles 402 payment challenges automatically
const fetchWithPayment = wrapFetchWithPayment(fetch, client);

const question = process.argv[2] || "What is the current price of BTC?";
console.log(`💬 Asking Minara (via x402): "${question}"\n`);

// Step 4: Make the request — payment happens behind the scenes
const response = await fetchWithPayment("https://x402.minara.ai/x402/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userQuery: question }),
});

if (!response.ok) {
  console.error(`❌ Error: ${response.status} ${response.statusText}`);
  const body = await response.text();
  console.error(body);
  process.exit(1);
}

const data = await response.json();
console.log("🤖 Minara:", data.content);
console.log("\n✅ Paid with USDC via x402 — no API key or account needed!");
