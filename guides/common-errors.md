# Common Errors & Solutions

Quick reference for errors you may encounter when using the Minara Agent API.

## API Key Errors

### 401 Unauthorized

```json
{ "error": "unauthorized", "message": "Invalid or missing API key" }
```

**Causes:**
- API key is missing or typo in the key
- Key was deleted or account downgraded from Pro/Partner

**Fix:**
```typescript
// Make sure the header format is correct
headers: {
  Authorization: `Bearer ${API_KEY}`,  // ← "Bearer " prefix is required
}
```

### 403 Forbidden — Credits Exhausted

API calls consume credits. If your balance reaches zero, requests will pause.

**Fix:**
- Check your credit balance at [minara.ai](https://minara.ai) → Profile
- Purchase more credits or upgrade your plan

---

## x402 Errors

### 402 Payment Required

```json
{
  "error": "payment_required",
  "paymentInstructions": {
    "amount": "0.20",
    "currency": "USDC",
    "recipient": "0xCF58...",
    "chain": "base"
  }
}
```

**This is expected behavior** — the x402 SDK handles this automatically. If you see this in your app, make sure you're using `wrapFetchWithPayment()` instead of raw `fetch()`.

### Insufficient USDC Balance

The x402 payment will fail if your wallet doesn't have enough USDC.

**Fix:**
- Bridge USDC to Base chain (cheapest option)
- Use a faucet for testnet USDC during development

### Invalid Payment Token

```json
{ "error": "unauthorized", "message": "Invalid payment response token" }
```

**Causes:**
- Payment proof expired (took too long between payment and retry)
- Wallet signature issue

**Fix:** The SDK normally handles retries. If persistent, check your private key and wallet balance.

---

## Request Errors

### 400 Bad Request — Missing Parameters

```json
{ "error": "bad_request", "message": "Missing required parameter: symbol" }
```

**Fix:** Check the required fields for each endpoint:

| Endpoint | Required fields |
|----------|----------------|
| Chat (API Key) | `mode`, `stream`, `message.role`, `message.content` |
| Chat (x402) | `userQuery` |
| Trading Signal | `symbol` |
| Text-to-Swap | `intent`, `walletAddress` |
| Prediction Market | `link`, `mode` |

### 429 Rate Limited

```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please try again in 30 seconds.",
  "retryAfter": 30
}
```

**Limits (x402):**
- Trading endpoints: 30 requests/minute
- AI endpoints: 60 requests/minute

**Fix:**
- Add retry logic with exponential backoff
- Cache responses where possible

```typescript
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const res = await fetch(url, options);
    if (res.status === 429) {
      const retryAfter = Number(res.headers.get("retry-after")) || 30;
      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      continue;
    }
    return res;
  }
  throw new Error("Max retries exceeded");
}
```

---

## Network Errors

### Timeout

Minara API calls (especially `expert` mode) can take 10-30 seconds.

**Fix:**
```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 60_000); // 60s timeout

const response = await fetch(url, {
  ...options,
  signal: controller.signal,
});
clearTimeout(timeout);
```

### CORS Issues (Browser)

Direct browser requests to `api-developer.minara.ai` may be blocked by CORS.

**Fix:** Use a backend proxy (like the demo app's Next.js API routes) instead of calling Minara directly from the browser.

---

## Still Stuck?

- [Minara API Documentation](https://minara.ai/docs/ecosystem/agent-api)
- [x402 Protocol Docs](https://docs.x402.org/)
- [x402 Discord](https://discord.gg/cdp)
