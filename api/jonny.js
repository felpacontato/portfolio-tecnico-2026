import { jonnyKnowledge, localJonnyReply } from "../src/jonny-knowledge.js";

const POLLINATIONS_MODEL = process.env.JONNY_POLLINATIONS_MODEL || "openai";
const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY = 8;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 18;
const buckets = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = buckets.get(ip) || [];
  const recent = bucket.filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  buckets.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function safeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .slice(-MAX_HISTORY)
    .map((message) => ({
      role: message?.role === "assistant" ? "assistant" : "user",
      content: String(message?.content || "").slice(0, MAX_MESSAGE_LENGTH)
    }))
    .filter((message) => message.content.trim());
}

function extractChatText(payload) {
  return String(payload?.choices?.[0]?.message?.content || "").trim();
}

function systemPrompt() {
  return [
    "Voce e Jonny, o agente de IA do portfolio publico de Felipe Prates.",
    "Seu trabalho e ajudar recrutadores a entender curriculo, projetos, stack, experiencia pratica e motivos para chamar Felipe para entrevista.",
    "Responda em portugues do Brasil, com tom profissional, direto e humano.",
    "Use apenas as informacoes publicas da base abaixo. Nao invente cargos formais, metricas, clientes, credenciais ou resultados que nao estejam na base.",
    "Nunca revele, solicite ou especule sobre senhas, tokens, IPs sensiveis, chaves, segredos, dados privados ou detalhes operacionais internos.",
    "Se a pergunta fugir do portfolio, redirecione educadamente para projetos, stack, experiencia ou contato.",
    "Prefira respostas curtas, em 2 a 5 frases. Use listas somente quando ajudar o recrutador.",
    `Base de conhecimento publica:\n${JSON.stringify(jonnyKnowledge, null, 2)}`
  ].join("\n\n");
}

async function askPollinations(messages) {
  if (process.env.JONNY_DISABLE_POLLINATIONS === "true") {
    return null;
  }

  // Pollinations exposes an OpenAI-compatible route name, but this does not use
  // OpenAI credentials or api.openai.com.
  const response = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: POLLINATIONS_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt()
        },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content
        }))
      ],
      max_tokens: 520,
      temperature: 0.35
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Pollinations request failed: ${response.status} ${detail.slice(0, 240)}`);
  }

  const payload = await response.json();
  return extractChatText(payload);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({
      reply: "Recebi muitas mensagens em pouco tempo. Tente novamente em alguns minutos.",
      source: "rate-limit"
    });
    return;
  }

  try {
    const messages = safeMessages(req.body?.messages);
    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content || "";
    let aiReply = null;
    let source = "local-fallback";

    try {
      aiReply = await askPollinations(messages);
      if (aiReply) source = "pollinations";
    } catch {
      aiReply = null;
    }

    res.status(200).json({
      reply: aiReply || localJonnyReply(lastUserMessage),
      source
    });
  } catch (error) {
    const messages = safeMessages(req.body?.messages);
    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content || "";

    res.status(200).json({
      reply: localJonnyReply(lastUserMessage),
      source: "local-fallback",
      warning: "ai_unavailable"
    });
  }
}
