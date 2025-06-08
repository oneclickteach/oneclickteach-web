import { NextResponse } from "next/server";
import { TeacherProfile } from "@/lib/types/teacher";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

const DB_PATH = path.join(process.cwd(), "src/app/api/db/teacher-profile.json");

// Helper function for error responses
function errorResponse(message: string, statusCode: number) {
  return NextResponse.json(
    { error: message },
    { status: statusCode }
  );
}

// Define the database type
const teacherProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  profilePictureUrl: z.string(),
  bioSummary: z.string(),
  teachingPhilosophy: z.string(),
  contactEmail: z.string(),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    telegram: z.string().optional(),
    whatsapp: z.string().optional()
  }),
  testimonials: z.array(z.object({
    id: z.string(),
    quote: z.string(),
    studentName: z.string(),
    date: z.string().optional()
  })).optional(),
  resources: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    type: z.enum(['link', 'download', 'video']).optional()
  })),
  schedulingUrl: z.string().optional()
});

const dbSchema = z.object({
  teachers: z.record(teacherProfileSchema)
});

// Helper function to read database
async function readDB(): Promise<z.infer<typeof dbSchema>> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const parsedData = JSON.parse(data);
    return dbSchema.parse(parsedData);
  } catch (error) {
    console.error("Error reading database:", error);
    throw new Error("Failed to read database");
  }
}

// Helper function to write to database
async function writeDB(data: z.infer<typeof dbSchema>): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database:", error);
    throw new Error("Failed to write to database");
  }
}

export async function GET(request: Request) {
  try {
    const db = await readDB();
    const teacher = Object.values(db.teachers)[0];
    if (!teacher) {
      return errorResponse("Teacher profile not found", 404);
    }
    return NextResponse.json(teacher);
  } catch (error) {
    return errorResponse("Failed to fetch profile", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updatedInfo } = data as Partial<TeacherProfile>;

    const db = await readDB();
    const teachers = db.teachers;

    const teacher = teachers[id as keyof typeof teachers];
    if (!teacher) {
      return errorResponse("Teacher profile not found", 404);
    }

    const updatedProfile = { ...teacher, ...updatedInfo };
    teachers[id as keyof typeof teachers] = updatedProfile;
    db.teachers = teachers;

    await writeDB(db);

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return errorResponse("Failed to update profile", 500);
  }
}
