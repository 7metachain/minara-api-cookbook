/**
 * Example 01 — Chat with Minara AI using API Key
 *
 * The simplest possible integration: send a question, get an answer.
 * This is your "Hello World" for the Minara Agent API.
 */

import "dotenv/config";

const MINARA_API_KEY = process.env.MINARA_API_KEY;
if (!MINARA_API_KEY) {
  console.error("❌ Missing MINARA_API_KEY in .env file");
  console.error("   Get your key at https://minara.ai → Profile → API tab");
  process.exit(1);
}

const question = process.argv[2] || "What is the current price of BTC?";

console.log(`\n💬 Asking Minara: "${question}"\n`);

const response = await fetch("https://api-developer.minara.ai/v1/developer/chat", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${MINARA_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    mode: "fast",
    stream: false,
    message: { role: "user", content: question },
  }),
});

if (!response.ok) {
  console.error(`❌ API error: ${response.status} ${response.statusText}`);
  const body = await response.text();
  console.error(body);
  process.exit(1);
}

const data = await response.json();
console.log("🤖 Minara:", data.content);
console.log(`\n📎 Chat ID: ${data.chatId}`);
