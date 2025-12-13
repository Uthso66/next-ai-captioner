import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Create form data to send to Python backend
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    // Send request to your Python backend
    const response = await fetch("http://localhost:8000/caption", {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Backend error: ${error}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Caption generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate caption" },
      { status: 500 }
    );
  }
}
