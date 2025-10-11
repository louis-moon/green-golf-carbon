// app/api/health/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";       // ensure serverless (not edge) on Netlify
export const dynamic = "force-dynamic"; // don't pre-render
export const revalidate = 0;            // disable ISR

export async function GET() {
  const vars = {
    hasResend: !!process.env.RESEND_API_KEY,
    hasFrom: !!process.env.CONTACT_FROM,
    hasTo: !!process.env.CONTACT_TO,
  };
  return NextResponse.json(vars, {
    headers: { "Cache-Control": "no-store" },
  });
}
