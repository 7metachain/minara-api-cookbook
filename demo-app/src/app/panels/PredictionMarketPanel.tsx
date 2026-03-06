"use client";

import { useState } from "react";
import CodeBlock from "../../components/CodeBlock";
import ResponseBlock from "../../components/ResponseBlock";

export default function PredictionMarketPanel() {
  const [link, setLink] = useState(
    "https://polymarket.com/event/will-there-be-another-us-government-shutdown-by-january-31"
  );
  const [mode, setMode] = useState<"fast" | "expert">("fast");
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/prediction-market", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link, mode, only_result: false }),
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
  "https://api-developer.minara.ai/v1/developer/prediction-market-ask",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: "${link}",
      mode: "${mode}",
      only_result: false,
      // customPrompt: "Focus on recent news sentiment"
    }),
  }
);

const data = await response.json();
// data.predictions[] → outcome probabilities
//   .outcome  → "Yes" / "No" or candidate name
//   .yesProb  → 0-1
//   .noProb   → 0-1
// data.reasoning → AI analysis text`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-lg border border-card-border bg-card p-4">
          <h3 className="mb-4 text-sm font-semibold">
            POST /v1/developer/prediction-market-ask
          </h3>

          <label className="mb-1 block text-xs text-muted">
            Polymarket Event URL
          </label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mb-4 w-full rounded-md border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="https://polymarket.com/event/..."
          />

          <label className="mb-1 block text-xs text-muted">Mode</label>
          <div className="mb-4 flex gap-2">
            {(["fast", "expert"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === m
                    ? "bg-accent text-white"
                    : "bg-background text-muted hover:text-foreground border border-card-border"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !link.trim()}
            className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-light disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Event"}
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
