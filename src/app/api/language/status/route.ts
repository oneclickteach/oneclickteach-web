import { NextResponse } from "next/server";
import { languages } from "@/app/api/db/languages.json";


export async function PUT(request: Request) {
  try {
    const { code, isActive } = await request.json();
    
    // Validate input
    if (!code || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    // Find the language
    const language = languages[code as keyof typeof languages]
    if (!language) {
      return NextResponse.json(
        { error: "Language not found" },
        { status: 404 }
      );
    }

    // Update the language status
    language.isActive = isActive;

    // In a real implementation, we would update the database here
    // For now, we'll just return the updated language
    return NextResponse.json({ language });
  } catch (error) {
    console.error('Error updating language status:', error);
    return NextResponse.json(
      { error: "Failed to update language status" },
      { status: 500 }
    );
  }
}
