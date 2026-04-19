import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import {auth} from "@clerk/nextjs/server";
import {supabase} from "@/lib/supabase"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { role, level } = body;

    // 1. Validate inputs
    if (!role || !level) {
      return NextResponse.json(
        { error: "Role and Level are required" },
        { status: 400 }
      );
    }

    // 2. Call Groq SDK
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Fixed casing
      messages: [
        {
          role: "user",
          content: `Generate a list of 5 interview questions for a ${role} role at ${level} level.`,
        },
      ],
    });

    const rawQuestions = response.choices[0].message.content || "";

    const cleanedQuestions = rawQuestions
      .split("\n")
      .map(q => q.replace(/^\d+[\.\)]\s*/, "").trim())
      .filter(q => q.length > 5);
      
    await supabase.from("generated_questions").insert({
      user_id: userId,
      role: role,
      level: level,
      questions: cleanedQuestions  // ← array, not raw string
    });
    
    return NextResponse.json({ questions: cleanedQuestions });

  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
