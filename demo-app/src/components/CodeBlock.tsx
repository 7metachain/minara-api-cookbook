"use client";

import { useState } from "react";

export default function CodeBlock({
  title,
  code,
  language = "typescript",
}: {
  title: string;
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-card-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-card-border px-4 py-2">
        <span className="text-xs font-medium text-muted">{title}</span>
        <button
          onClick={handleCopy}
          className="rounded px-2 py-1 text-xs text-muted transition-colors hover:bg-card-border hover:text-foreground"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
