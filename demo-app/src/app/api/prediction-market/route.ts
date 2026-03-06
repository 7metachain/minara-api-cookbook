import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.MINARA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "MINARA_API_KEY not configured on server" },
      { status: 500 }
    );
  }

  const { link, mode = "fast", only_result = false, customPrompt } =
    await req.json();

  const response = await fetch(
    "https://api-developer.minara.ai/v1/developer/prediction-market-ask",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link, mode, only_result, customPrompt }),
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
