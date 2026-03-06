"use client";

import { useState } from "react";
import CodeBlock from "../../components/CodeBlock";
import ResponseBlock from "../../components/ResponseBlock";

const SYMBOLS = ["BTC", "ETH", "SOL", "BNB", "DOGE", "XRP"];
const STYLES = ["scalping", "day-trading", "swing-trading"] as const;

export default function TradingSignalPanel() {
  const [symbol, setSymbol] = useState("BTC");
  const [style, setStyle] = useState<string>("day-trading");
  const [leverage, setLeverage] = useState(10);
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/trading-signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, style, leverage, marginUSD: 1000 }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const codeSnippet = `const response = await fetch(
  "https://api-developer.minara.ai/v1/developer/perp-trading-suggestion",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symbol: "${symbol}",
      style: "${style}",
      marginUSD: 1000,
      leverage: ${leverage},
      strategy: "max-profit",
    }),
  }
);

const signal = await response.json();
// signal.side        → "long" or "short"
// signal.entryPrice  → recommended entry
// signal.stopLossPrice / takeProfitPrice
// signal.confidence  → 0-100
// signal.reasons[]   → analysis details
// signal.risks[]     → risk factors`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-lg border border-card-border bg-card p-4">
          <h3 className="mb-4 text-sm font-semibold">
            POST /v1/developer/perp-trading-suggestion
          </h3>

          <label className="mb-1 block text-xs text-muted">Symbol</label>
          <div className="mb-4 flex flex-wrap gap-2">
            {SYMBOLS.map((s) => (
              <button
                key={s}
                onClick={() => setSymbol(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  symbol === s
                    ? "bg-accent text-white"
                    : "bg-background text-muted hover:text-foreground border border-card-border"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <label className="mb-1 block text-xs text-muted">Style</label>
          <div className="mb-4 flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  style === s
                    ? "bg-accent text-white"
                    : "bg-background text-muted hover:text-foreground border border-card-border"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <label className="mb-1 block text-xs text-muted">
            Leverage: {leverage}x
          </label>
          <input
            type="range"
            min={1}
            max={40}
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="mb-4 w-full accent-accent"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-light disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Get Trading Signal"}
          </button>
        </div>

        <ResponseBlock data={data} loading={loading} error={error} />
      </div>

      <div>
        <CodeBlock
          title="Code Snippet — copy this into your project"
          code={codeSnippet}
        />
      </div>
    </div>
  );
}
