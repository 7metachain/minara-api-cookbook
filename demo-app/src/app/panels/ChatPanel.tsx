"use client";

import { useState } from "react";
import CodeBlock from "../../components/CodeBlock";
import ResponseBlock from "../../components/ResponseBlock";

export default function ChatPanel() {
  const [message, setMessage] = useState("What is the current price of BTC?");
  const [mode, setMode] = useState<"fast" | "expert">("fast");
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mode }),
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
  "https://api-developer.minara.ai/v1/developer/chat",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mode: "${mode}",
      stream: false,
      message: {
        role: "user",
        content: ${JSON.stringify(message)},
      },
    }),
  }
);

const data = await response.json();
console.log(data.content);`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-lg border border-card-border bg-card p-4">
          <h3 className="mb-4 text-sm font-semibold">
            POST /v1/developer/chat
          </h3>

          <label className="mb-1 block text-xs text-muted">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="mb-4 w-full rounded-md border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="Ask anything about crypto..."
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
            disabled={loading || !message.trim()}
            className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-light disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>

        <ResponseBlock data={data} loading={loading} error={error} />
      </div>

      <div>
        <CodeBlock title="Code Snippet — copy this into your project" code={codeSnippet} />
      </div>
    </div>
  );
}
