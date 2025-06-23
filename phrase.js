import "dotenv/config";
import OpenAI from "openai";
const client = new OpenAI(process.env.OPENAI_API_KEY);

const response = await client.responses.create({
  model: "gpt-4o-mini",
  input: "Code moi un site one page en html, css et js.",
});

console.log(response.output_text);
