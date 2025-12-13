import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function testHuggingFace() {
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
  if (!HUGGINGFACE_API_KEY) {
    console.error("HUGGINGFACE_API_KEY is not set in .env.local");
    return;
  }

  const client = new InferenceClient(HUGGINGFACE_API_KEY);

  try {
    console.log("Fetching image...");
    const imageUrl =
      "https://huggingface.co/datasets/Narsil/image_dummy/raw/main/parrots.png";
    const response = await fetch(imageUrl);
    const imageData = await response.blob(); // Get the image as a Blob

    console.log("Calling Hugging Face API for captioning...");
    // Use the correct task method. For image-to-text:
    const caption = await client.imageToText({
      data: imageData,
      model: "Salesforce/blip-image-captioning-large",
    });

    console.log("Generated caption:", caption);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testHuggingFace();
