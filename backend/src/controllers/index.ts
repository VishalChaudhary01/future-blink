import { Conversation } from "@/models/Conversation";
import { RequestHandler } from "express";

export const askAi: RequestHandler = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [{ role: "user", content: prompt }],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ message: errorData.error?.message ?? "OpenRouter API error" });
    }

    const data = await response.json();

    const aiReply = data.choices[0].message.content;

    res.status(200).json({ reply: aiReply });
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const saveConversation: RequestHandler = async (req, res) => {
  const { prompt, response } = req.body;

  if (!prompt || !response) {
    return res.status(400).json({ error: "Prompt and response are required" });
  }

  try {
    const conversation = await Conversation.create({ prompt, response });

    res.status(201).json({
      message: "Conversation saved successfully",
      conversation,
    });
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    res.status(500).json({ message: "Failed to save to database" });
  }
};
