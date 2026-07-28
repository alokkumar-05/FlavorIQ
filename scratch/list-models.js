const fs = require('fs');
const path = require('path');

async function listModels() {
  const envFile = fs.readFileSync(path.join(__dirname, '../frontend/.env'), 'utf8');
  const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
  if (!apiKeyMatch) {
    console.error("No API key found in .env");
    return;
  }
  const apiKey = apiKeyMatch[1].trim();

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    if (data.models) {
      console.log("Available generateContent models:");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`- ${m.name}`);
        }
      });
    } else {
      console.error(data);
    }
  } catch(e) {
    console.error(e);
  }
}
listModels();
