"use client";

import { useState } from "react";

export default function ResponseBlock({
  data,
  loading,
  error,
}: {
  data: unknown;
  loading: boolean;
  error: string | null;
}) {
  const [copied, setCopied] = useState(false);
  const json = data ? JSON.stringify(data, null, 2) : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-card-border bg-card p-6">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <span className="text-sm text-muted">Calling Minara API...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-danger/30 bg-danger/5 p-4">
        <p className="text-sm font-medium text-danger">Error</p>
        <p className="mt-1 text-sm text-danger/80">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg border border-dashed border-card-border p-6 text-center text-sm text-muted">
        Response will appear here after you send a request.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-card-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-card-border px-4 py-2">
        <span className="text-xs font-medium text-success">
          ✓ 200 OK
        </span>
        <button
          onClick={handleCopy}
          className="rounded px-2 py-1 text-xs text-muted transition-colors hover:bg-card-border hover:text-foreground"
        >
          {copied ? "✓ Copied" : "Copy JSON"}
        </button>
      </div>
      <pre className="max-h-96 overflow-auto p-4 text-sm leading-relaxed">
        <code>{json}</code>
      </pre>
    </div>
  );
}
