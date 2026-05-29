const fs = require("fs");
const { createClient } = require("@deepgram/sdk");

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const speechToText = async (audioPath) => {
  const audioBuffer = fs.readFileSync(audioPath);

  const { result } =
    await deepgram.listen.prerecorded.transcribeFile(audioBuffer, {
      model: "nova-2",
      smart_format: true,
      punctuate: true,
      diarize: true,
      utterances: true,
    });

  const transcript =
    result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

  return transcript;
};

module.exports = speechToText;