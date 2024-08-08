"use server";

import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRecepes(pantryString) {
  const prompt = `Generate three recipes with these ingredients: ${pantryString}. The output should be in JSON array and each object should contain a recipe name field (with a cute emoji) named 'name', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'`;
  try {
    const response = await chatModel.invoke(prompt);

    console.log("Raw AI Response: ", response.content);

    try {
      return JSON.parse(response.content);
    } catch (error) {
      console.error("Error parsing JSON response: ", error);
      throw new Error("Failed to parse AI response");
    }
  } catch (error) {
    console.error("Error invoking AI model: ", error);
    throw new Error("AI model invocation failed");
  }
}
