import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SYNC_FILE = path.join(process.cwd(), "..", "estatex_db.json");

export async function GET() {
  try {
    if (fs.existsSync(SYNC_FILE)) {
      const content = fs.readFileSync(SYNC_FILE, "utf8");
      return NextResponse.json(JSON.parse(content));
    }
  } catch (err) {
    console.error("Error reading sync file:", err);
  }
  return NextResponse.json({});
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    let existing = {};
    if (fs.existsSync(SYNC_FILE)) {
      try {
        existing = JSON.parse(fs.readFileSync(SYNC_FILE, "utf8"));
      } catch (e) {
        console.error("Error parsing sync file, resetting:", e);
      }
    }
    const updated = { ...existing, ...data };
    fs.writeFileSync(SYNC_FILE, JSON.stringify(updated, null, 2), "utf8");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error writing sync file:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
