import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const nodeKey = process.env.NODE_KEY ?? "";
  return NextResponse.json(
    {
      ok: true,
      service: "pc-ecosystem",
      version: process.env.APP_VERSION ?? "0.1.0",
      nodeConfigured: nodeKey.trim().length > 0,
      tunnelEnabled: (process.env.TUNNEL ?? "1") === "1",
      localAiEnabled: (process.env.LOCAL_AI ?? "0") === "1",
      timestamp: new Date().toISOString()
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
