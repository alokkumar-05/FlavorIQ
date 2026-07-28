const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: "frontend/.env" });

async function checkModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("Fetching models...");
  try {
    // The current SDK version 0.2.x doesn't have listModels directly on genAI instance usually, or it does.
    // wait, I can just use a fetch request with the API key to be sure.
  } catch(e) { console.error(e) }
}
checkModels();
