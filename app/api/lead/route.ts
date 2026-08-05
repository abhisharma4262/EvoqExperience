import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  note: z.string().optional(),
  path: z.enum(["walkthrough", "runtime-deep-dive"]),
  offeringSlug: z.string().optional(),
  sourceScene: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead payload" },
        { status: 400 },
      );
    }

    // Placeholder: log to server console until CRM/email webhook is wired.
    console.log("[EVOQ lead]", parsed.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process lead" },
      { status: 500 },
    );
  }
}
