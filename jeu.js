import * as readline from "node:readline/promises";
import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI(process.env.OPENAI_API_KEY);

async function startGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Bienvenue dans le jeu de devinettes !");
  console.log(
    "ChatGPT va penser à un objet, un animal ou une personne célèbre."
  );
  console.log(
    "Posez des questions pour deviner. ChatGPT répondra par 'oui', 'non' ou 'je ne sais pas'."
  );
  console.log("Tapez 'quit' pour quitter le jeu.");

  // ChatGPT pense à un objet, animal ou personne célèbre
  const systemMessage = {
    role: "system",
    content:
      "Pense à un objet, un animal ou une personne célèbre. Réponds uniquement par 'oui', 'non' ou 'je ne sais pas' aux questions.",
  };

  const initialResponse = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [systemMessage],
  });

  console.log("ChatGPT a choisi quelque chose. À vous de deviner !");

  let guessed = false;

  while (!guessed) {
    const userQuestion = await rl.question("Votre question : ");
    if (userQuestion.toLowerCase() === "quit") {
      console.log("Merci d'avoir joué !");
      break;
    }

    const userMessage = { role: "user", content: userQuestion };

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, userMessage],
    });

    const answer = response.choices[0].message.content.trim();

    console.log(`ChatGPT : ${answer}`);

    if (answer.toLowerCase() === "oui") {
      const confirmation = await rl.question(
        "Est-ce votre réponse finale ? (oui/non) : "
      );
      if (confirmation.toLowerCase() === "oui") {
        console.log("Bravo, vous avez deviné !");
        guessed = true;
      }
    }
  }

  rl.close();
}

startGame();
