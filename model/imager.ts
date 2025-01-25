import { OpenAI } from "openai";  // Ensure correct import
import dotenv from "dotenv";      // To load environment variables

dotenv.config();  // Load environment variables

async function generateImage() {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,  // Access API key securely
  });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });

  console.log(response.data[0].url);
}

generateImage();  // Calling the async function
