"use client";

import { useState } from "react";
import ChatPanel from "./panels/ChatPanel";
import TradingSignalPanel from "./panels/TradingSignalPanel";
import TextToSwapPanel from "./panels/TextToSwapPanel";
import PredictionMarketPanel from "./panels/PredictionMarketPanel";

const TABS = [
  { id: "chat", label: "AI Chat", icon: "💬", description: "Ask anything about crypto" },
  { id: "signal", label: "Trading Signal", icon: "📊", description: "AI long/short recommendations" },
  { id: "swap", label: "Text-to-Swap", icon: "🔄", description: "Natural language → swap tx" },
  { id: "predict", label: "Prediction Market", icon: "🔮", description: "Polymarket event analysis" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("chat");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-card-border">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white">
              M
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Minara API Playground
              </h1>
              <p className="text-sm text-muted">
                Developer Cookbook — Try every endpoint, see the code, build
                faster.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-8 flex gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "bg-card text-muted hover:bg-card-border hover:text-foreground"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <p className="mb-6 text-sm text-muted">
          {TABS.find((t) => t.id === activeTab)?.description}
        </p>

        <div>
          {activeTab === "chat" && <ChatPanel />}
          {activeTab === "signal" && <TradingSignalPanel />}
          {activeTab === "swap" && <TextToSwapPanel />}
          {activeTab === "predict" && <PredictionMarketPanel />}
        </div>
      </main>

      <footer className="border-t border-card-border py-6 text-center text-xs text-muted">
        Minara API Developer Cookbook — Built for developers, by developers.{" "}
        <a
          href="https://minara.ai/docs/ecosystem/agent-api"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-light hover:underline"
        >
          API Docs
        </a>
        {" · "}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-light hover:underline"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
