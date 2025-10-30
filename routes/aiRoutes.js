const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const { CohereClient } = require("cohere-ai");

// ✅ Initialize Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

// 🧠 Route to handle AI diagnosis
router.post("/diagnose", async (req, res) => {
  const { description } = req.body;

  try {
    // ✅ Use the updated model name
    const response = await cohere.chat({
      model: "command-r-plus-08-2024", // 👈 UPDATED MODEL
      message: `You are an experienced car mechanic. Analyze this car problem and explain likely causes and possible fixes: ${description}`
    });

    const reply = response.text || "⚠️ No response from AI.";

    // ✅ Save to MongoDB
    const chat = new Chat({ description, reply });
    const savedChat = await chat.save();

    res.json({ reply, savedChat });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ message: "AI error", error: err.message });
  }
});

module.exports = router;
