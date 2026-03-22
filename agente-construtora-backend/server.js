

require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const rateLimit  = require("express-rate-limit");
const fetch      = require("node-fetch");


const app  = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());


app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["GET", "POST"],
}));


const limiter = rateLimit({
  windowMs: 60 * 1000,   
  max: 30,
  message: {
    error: "Muitas requisições. Aguarde um momento e tente novamente."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);


if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.includes("COLOQUE_SUA_CHAVE")) {
  console.warn("⚠️  ATENÇÃO: ANTHROPIC_API_KEY não configurada no arquivo .env");
}




app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    ambiente: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});


app.post("/api/gerar-mensagem", async (req, res) => {
  const { systemPrompt, userPrompt } = req.body;

 
  if (!systemPrompt || !userPrompt) {
    return res.status(400).json({
      error: "Os campos 'systemPrompt' e 'userPrompt' são obrigatórios."
    });
  }

  if (typeof systemPrompt !== "string" || typeof userPrompt !== "string") {
    return res.status(400).json({
      error: "Os campos devem ser strings."
    });
  }

  if (systemPrompt.length > 8000 || userPrompt.length > 8000) {
    return res.status(400).json({
      error: "Conteúdo muito longo. Limite de 8000 caracteres por campo."
    });
  }

  try {
    
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":       "application/json",
        "x-api-key":          process.env.ANTHROPIC_API_KEY,
        "anthropic-version":  "2023-06-01",
      },
      body: JSON.stringify({
        model:      "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system:     systemPrompt,
        messages:   [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro Anthropic API:", response.status, errorData);
      return res.status(response.status).json({
        error: errorData?.error?.message || "Erro na API da Anthropic."
      });
    }

    const data    = await response.json();
    const message = data.content?.map(block => block.text || "").join("") || "";

    if (!message) {
      return res.status(500).json({ error: "Resposta vazia da IA." });
    }

    return res.json({ message });

  } catch (err) {
    console.error("Erro interno:", err);
    return res.status(500).json({
      error: "Erro interno do servidor. Tente novamente."
    });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});


app.listen(PORT, () => {
  console.log("─────────────────────────────────────────");
  console.log(`🏗️  Agente IA — Comunicação de Obras`);
  console.log(`🚀  Servidor rodando em http://localhost:${PORT}`);
  console.log(`🌍  Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔒  CORS permitido para: ${process.env.ALLOWED_ORIGIN || "*"}`);
  console.log("─────────────────────────────────────────");
});