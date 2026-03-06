import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.MINARA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "MINARA_API_KEY not configured on server" },
      { status: 500 }
    );
  }

  const { message, mode = "fast" } = await req.json();

  const response = await fetch(
    "https://api-developer.minara.ai/v1/developer/chat",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode,
        stream: false,
        message: { role: "user", content: message },
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
