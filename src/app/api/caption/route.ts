import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    // Ensure image URL is provided
    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image in one sentence." },
            { type: "image_url", image_url: imageUrl },
          ],
        },
      ],
    });

    const caption = response.choices[0]?.message?.content?.trim() || "No caption generated.";
    return NextResponse.json({ caption });
  } catch (error) {
    console.error("Caption API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate caption." },
      { status: 500 }
    );
  }
}
