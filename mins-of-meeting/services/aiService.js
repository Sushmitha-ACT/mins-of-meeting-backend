const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateMoM = async (transcript) => {
  try {

    const prompt = `
You are an AI Minutes of Meeting generator.

Analyze the meeting transcript carefully.

IMPORTANT RULES:
- Do NOT invent information
- Do NOT add explanations
- Do NOT add extra text
- Understand English and Tanglish
- Return ONLY valid JSON
- Only assign a person if explicitly mentioned in the transcript
- If unclear, set "assigned_to": "Not specified"
- Only use deadlines if explicitly mentioned
- If no deadline is mentioned, use "Not specified"

JSON FORMAT:
{
  "meeting_summary":"",
  "key_points": [],
  "decisions": [],
  "action_items": [
    {
      "task": "",
      "assigned_to": "",
      "deadline": ""
    }
  ]
}

Transcript:
${transcript}
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.2,
      });

    const rawText =
      completion.choices[0].message.content;

    console.log("AI RESPONSE:");
    console.log(rawText);

    // REMOVE MARKDOWN
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // EXTRACT ONLY JSON
    const jsonStart =
      cleaned.indexOf("{");

    const jsonEnd =
      cleaned.lastIndexOf("}");

    const jsonString =
      cleaned.slice(
        jsonStart,
        jsonEnd + 1
      );

    // PARSE JSON
    const result =
      JSON.parse(jsonString);

    return result;

  } catch (error) {

    console.log(
      "AI Error:",
      error.message
    );

    throw new Error(
      "Meeting summary generation failed"
    );
  }
};

module.exports = generateMoM;