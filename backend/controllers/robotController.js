require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getRobotResponse = asyncHandler(async (req, res) => {
  const userMessage = req.body.message;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userMessage },
    ],
  });
  res.json({ response: completion.choices[0].message.content });
});

module.exports = { getRobotResponse };
