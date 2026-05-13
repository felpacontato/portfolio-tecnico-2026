import { createFileRoute } from "@tanstack/react-router";
import { jonnyKnowledge, localJonnyReply } from "@/lib/jonny-knowledge.js";

const POLLINATIONS_MODEL = "openai";
const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY = 8;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 18;
const buckets = new Map<string, number[]>();

type Msg = { role: "user" | "assistant"; content: string };

function isRateLimited(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip) || [];
  const recent = bucket.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  buckets.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function safeMessages(messages: unknown): Msg[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .slice(-MAX_HISTORY)
    .map((m: any): Msg => ({
      role: m?.role === "assistant" ? "assistant" : "user",
      content: String(m?.content || "").slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((m) => m.content.trim());
}

function cleanReply(reply: string | null | undefined): string {
  return String(reply || "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
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
    "Nao use Markdown, asteriscos, tabelas ou blocos de codigo. Responda em texto simples.",
    `Base de conhecimento publica:\n${JSON.stringify(jonnyKnowledge, null, 2)}`,
  ].join("\n\n");
}

async function askPollinations(messages: Msg[]): Promise<string | null> {
  const response = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: POLLINATIONS_MODEL,
      messages: [
        { role: "system", content: systemPrompt() },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 520,
      temperature: 0.35,
    }),
  });
  if (!response.ok) return null;
  const payload: any = await response.json();
  return String(payload?.choices?.[0]?.message?.content || "").trim() || null;
}

export const Route = createFileRoute("/api/jonny")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
          "unknown";
        if (isRateLimited(ip)) {
          return Response.json({
            reply:
              "Recebi muitas mensagens em pouco tempo. Tente novamente em alguns minutos.",
            source: "rate-limit",
          });
        }
        let body: any = {};
        try {
          body = await request.json();
        } catch {}
        const messages = safeMessages(body?.messages);
        const lastUser =
          [...messages].reverse().find((m) => m.role === "user")?.content || "";
        let reply: string | null = null;
        let source = "local-fallback";
        try {
          reply = await askPollinations(messages);
          if (reply) source = "pollinations";
        } catch {
          reply = null;
        }
        return Response.json({
          reply: cleanReply(reply || localJonnyReply(lastUser)),
          source,
        });
      },
    },
  },
});
