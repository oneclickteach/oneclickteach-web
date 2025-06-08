import { NextResponse } from "next/server";
import languages from "@/app/api/db/languages.json";

export async function GET() {
  try {
    // The languages are at the root level in the JSON file
    return NextResponse.json({ languages });
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { error: "Failed to fetch languages" },
      { status: 500 }
    );
  }
}
