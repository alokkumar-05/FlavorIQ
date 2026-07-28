const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '../frontend/.env'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
});

const STRAPI_URL = env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = env.STRAPI_API_TOKEN;

async function testSave() {
  const strapiRecipeData = {
    data: {
      tittle: "Pan-Seared Salmon with Garlic Asparagus & Roasted Potatoes",
      description: "A delicious and healthy dinner.",
      cuisine: "american",
      category: "dinner",
      ingredients: [
        { item: "Salmon", amount: "2 fillets", category: "Protein" }
      ],
      instructions: [
        { step: 1, title: "Cook", instruction: "Cook the salmon" }
      ],
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      nutrition: {
        calories: "500",
        protein: "40g",
        carbs: "20g",
        fat: "20g"
      },
      tips: ["Don't overcook the salmon"],
      susbtitutions: [],
      imageUrl: "",
      isPublic: true,
      author: 1, // We don't know the user ID, maybe this is the issue?
    }
  };

  const response = await fetch(`${STRAPI_URL}/api/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify(strapiRecipeData),
  });

  const text = await response.text();
  console.log("Status:", response.status);
  console.log("Response:", text);
}

testSave();
