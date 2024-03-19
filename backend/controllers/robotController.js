require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { OpenAI } = require("openai");

// 获取该chat的所有对话
const Message = require("../models/message");

const fetchChatHistory = async (chatId) => {
  try {
    const messages = await Message.find({ chat: chatId })
      .sort("createdAt")
      .populate("sender", "name");

    // Format each message
    const chatHistory = messages
      .map((message) => {
        return `${message.sender.name}: ${message.content}`;
      })
      .join("\n");

    return chatHistory;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return null;
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const getRobotResponse = asyncHandler(async (req, res) => {
//   const userMessage = req.body.message;
//   const completion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: userMessage },
//     ],
//   });
//   res.json({ response: completion.choices[0].message.content });
// });

const getRobotResponse = asyncHandler(async (req, res) => {
  const { chatId, myName, senderName } = req.body;

  const chatHistory = await fetchChatHistory(chatId);

  if (!chatHistory) {
    return res.status(500).json({ message: "Failed to fetch chat history." });
  }

  const messages = [
    {
      role: "system",
      content: `You are an assistant that helps reply messages as if you were ${myName}. You do not reveal your identity as an AI. When asked about your identity, respond in a manner that aligns with ${myName}'s personality and current conversation context without revealing you are an AI.`,
    },
    ...chatHistory.split("\n").map((line) => {
      const [name, content] = line.split(": ");
      return {
        role: name.trim() === myName ? "assistant" : "user",
        content,
      };
    }),
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  res.json({ response: completion.choices[0].message.content });
});

module.exports = { getRobotResponse };
