export const jonnyQuickQuestions = [
  "Resumo do Felipe em 30 segundos",
  "Quais projetos devo olhar primeiro?",
  "Qual stack ele domina?",
  "Ele tem experiencia com IA e automacao?",
  "Por que chamar para entrevista?"
];

export const jonnyKnowledge = {
  owner: "Felipe Prates",
  role: "Desenvolvedor Full Stack Junior com foco em IA aplicada, automacao, APIs, dados e operacao.",
  goal: "Buscar a primeira oportunidade formal como Full Stack ou Backend Developer.",
  summary:
    "Felipe cria produtos reais de ponta a ponta: frontend, backend, banco de dados, automacoes, agentes, deploy, QA e operacao. O portfolio prioriza projetos praticos em vez de demos isoladas.",
  links: {
    email: "felpacontato@gmail.com",
    github: "https://github.com/felpacontato",
    linkedin: "https://www.linkedin.com/in/felipe-prates-070985376/"
  },
  stack: [
    "React",
    "Next.js",
    "Vite",
    "TypeScript",
    "JavaScript",
    "FastAPI",
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "Prisma",
    "n8n",
    "Docker",
    "Linux VPS",
    "Vercel",
    "webhooks",
    "LLMs",
    "automacoes"
  ],
  projects: [
    {
      name: "FelpaMusic",
      type: "Plataforma musical com IA",
      highlights:
        "Criacao musical, mixagem/masterizacao, separacao de stems, pipelines longos e assincronos, Supabase, FastAPI, n8n, agentes e servicos em conteineres."
    },
    {
      name: "Vitrinno",
      type: "Rede social musical / SaaS para artistas",
      highlights:
        "Autenticacao, perfis, feed, mensagens, uploads, catalogo, checkout, biblioteca e base para publicacao multicanal."
    },
    {
      name: "Helena Video",
      type: "Studio de video com IA",
      highlights:
        "Briefing, modulos criativos, jobs de video, assets, timeline, publicacao, provedores externos e assistente para transformar intencao criativa em parametros operacionais."
    },
    {
      name: "OLI Locacoes",
      type: "Sistema para locacao e operacao",
      highlights:
        "Fluxos comerciais, organizacao operacional, interface para consulta e gestao."
    },
    {
      name: "CRM Total Tour",
      type: "CRM e automacoes comerciais",
      highlights:
        "Kommo API, pipelines, leads, eventos, campos customizados, n8n, Redis buffer, webhooks e assistente para contexto comercial."
    }
  ],
  strengths: [
    "Transforma problemas abertos em sistemas utilizaveis.",
    "Consegue atuar em frontend, backend, dados, automacao e deploy.",
    "Tem repertorio pratico com IA aplicada e agentes, sem depender apenas de prompts.",
    "Documenta limites, preserva dados sensiveis e pensa em operacao real.",
    "Aprende rapido e ja lidou com projetos completos, bugs, infraestrutura e validacao."
  ],
  boundaries: [
    "Nao revelar segredos, tokens, senhas, IPs sensiveis ou dados privados.",
    "Nao inventar experiencias, cargos formais ou resultados nao citados no portfolio.",
    "Se perguntarem algo que nao esta no portfolio, sugerir contato direto."
  ]
};

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const projectSummary = () =>
  jonnyKnowledge.projects
    .map((project) => `${project.name}: ${project.type}. ${project.highlights}`)
    .join("\n");

const withoutFinalPeriod = (value) => String(value || "").replace(/\.+$/, "");

export function localJonnyReply(question = "") {
  const text = normalize(question);

  if (!text.trim()) {
    return "Pergunte sobre projetos, stack, IA, backend, arquitetura, experiencia pratica ou motivos para chamar Felipe para entrevista.";
  }

  if (text.includes("contato") || text.includes("email") || text.includes("linkedin") || text.includes("github")) {
    return `Para contato: ${jonnyKnowledge.links.email}. GitHub: ${jonnyKnowledge.links.github}. LinkedIn: ${jonnyKnowledge.links.linkedin}.`;
  }

  if (text.includes("projeto") || text.includes("portfolio") || text.includes("case")) {
    return `Os principais projetos sao:\n${projectSummary()}`;
  }

  if (text.includes("stack") || text.includes("tecnologia") || text.includes("linguagem") || text.includes("framework")) {
    return `A stack recorrente inclui ${jonnyKnowledge.stack.join(", ")}. O ponto forte e combinar frontend, backend, dados, automacoes e deploy em produtos reais.`;
  }

  if (text.includes("ia") || text.includes("agente") || text.includes("automacao") || text.includes("n8n")) {
    return "Sim. O portfolio mostra uso pratico de IA aplicada, agentes, n8n, webhooks e pipelines assincronos em FelpaMusic, Helena Video e CRM Total Tour. O foco nao e so gerar texto, mas integrar IA a fluxos reais de produto.";
  }

  if (text.includes("entrevista") || text.includes("contratar") || text.includes("vaga") || text.includes("recrutador")) {
    return `Vale chamar para entrevista porque Felipe ja executou produtos completos de ponta a ponta, entende operacao real e consegue aprender rapido dentro de um time. Pontos fortes: ${jonnyKnowledge.strengths.join(" ")}`;
  }

  if (text.includes("resumo") || text.includes("30 segundos") || text.includes("quem e")) {
    return `${jonnyKnowledge.owner} é ${withoutFinalPeriod(jonnyKnowledge.role)}. ${jonnyKnowledge.summary} Atualmente busca a primeira oportunidade formal como Full Stack ou Backend Developer.`;
  }

  return `${jonnyKnowledge.summary} Posso responder perguntas sobre projetos, stack, IA/automacao, arquitetura, motivos para entrevista ou formas de contato.`;
}
