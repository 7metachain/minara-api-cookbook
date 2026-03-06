import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.MINARA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "MINARA_API_KEY not configured on server" },
      { status: 500 }
    );
  }

  const { symbol, style = "day-trading", marginUSD = 1000, leverage = 10 } =
    await req.json();

  const response = await fetch(
    "https://api-developer.minara.ai/v1/developer/perp-trading-suggestion",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol,
        style,
        marginUSD,
        leverage,
        strategy: "max-profit",
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json(
      { error: `Minara API error: ${response.status}`, details: text },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
