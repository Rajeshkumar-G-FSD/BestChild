import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client safely
  let ai: GoogleGenAI | null = null;
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", geminiConfigured: !!ai });
  });

  app.post("/api/gemini/chat", async (req, res) => {
    const { messages } = req.body; 
    if (!ai) {
      // In case API Key is missing, provide a friendly local mock response so development never breaks
      const lastMessage = messages?.[messages.length - 1]?.text || "";
      return res.json({
        text: `**[Demo Mode - Gemini API Key Not Injected]**\n\nThank you for asking about: "${lastMessage}".\n\nI am currently operating in offline mode. For full AI pediatric insights, please configure your **GEMINI_API_KEY** in **Settings > Secrets**.\n\n*General Advice:* For child concerns, monitor hydration, temperature, and behavior. Please seek immediate attention if the child has trouble breathing, high fever, or lethargy.\n\n*Disclaimer: I am an AI, not a doctor. Always consult a pediatrician.*`
      });
    }
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    try {
      const formattedContents = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: "You are 'BabyCare AI Care Expert', a compassionate and highly professional AI child-care advisor. Give parents warm, supportive, clear, and medically safe explanations of childhood symptoms, feeding, development stages, sleep training, or common pediatric illnesses. Make use of list formats and clear headers. IMPORTANT DISCLAIMER AT END: Always write a prominent, friendly medical disclaimer in italics reminding parents that you are an AI assistant and they must always contact their pediatrician or emergency services for medical decisions or emergencies.",
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "Error generating content" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
