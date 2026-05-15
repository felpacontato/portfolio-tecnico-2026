export type StudyRow = {
  left: string;
  middle: string;
  right: string;
  note?: string;
};

export type Flow = {
  name: string;
  goal: string;
  steps: string[];
  files: string[];
  apis: string[];
  interview: string;
};

export type CodeFile = {
  path: string;
  purpose: string;
  parts: string[];
  beginner: string;
  interview: string;
};

export type InterviewQA = {
  category: string;
  questions: { q: string; a: string }[];
};

export type ProjectChapter = {
  id: string;
  name: string;
  url: string;
  repoPath: string;
  status: "documented" | "partial" | "pending";
  oneLine: string;
  problem: string;
  audience: string;
  value: string;
  mainFlow: string;
  technicalDiff: string;
  interview30: string;
  technicalSummary: string;
  beginnerSummary: string;
  stack: StudyRow[];
  folders: StudyRow[];
  pages: StudyRow[];
  components: StudyRow[];
  endpoints: StudyRow[];
  database: StudyRow[];
  integrations: StudyRow[];
  env: StudyRow[];
  flows: Flow[];
  codeFiles: CodeFile[];
  libraries: StudyRow[];
  security: string[];
  errors: string[];
  performance: string[];
  ux: string[];
  pending: string[];
  interview: InterviewQA[];
  checklist: string[];
};

const commonInterview = (project: string): InterviewQA[] => [
  {
    category: "Perguntas gerais",
    questions: [
      {
        q: `O que e o ${project}?`,
        a: `Eu explicaria como um produto real do meu portfolio, construido para resolver um fluxo de usuario especifico. A resposta sempre parte do problema, passa pela stack e fecha com o que eu implementei e validei.`,
      },
      {
        q: "Qual foi sua responsabilidade?",
        a: "Minha responsabilidade foi transformar a ideia em uma aplicacao utilizavel: entender fluxo, organizar interface, integrar dados, cuidar de autenticacao quando existia, validar build/deploy e documentar pontos pendentes sem mascarar funcao incompleta.",
      },
    ],
  },
  {
    category: "Perguntas tecnicas",
    questions: [
      {
        q: "Como voce organizou frontend e backend?",
        a: "Eu separo a camada visual, a camada de servicos/API e a camada de dados. No frontend ficam rotas, componentes e hooks. No backend ou BaaS ficam validacao, persistencia, webhooks e integracoes externas.",
      },
      {
        q: "Como voce evita expor segredo?",
        a: "Chaves secretas ficam em variaveis de ambiente no servidor. No frontend so entram chaves publicas ou anonimas quando o provedor permite. A documentacao nunca mostra valores reais.",
      },
    ],
  },
  {
    category: "Melhorias",
    questions: [
      {
        q: "O que voce melhoraria?",
        a: "Eu adicionaria mais testes E2E, monitoramento de producao, metricas de uso e contratos automatizados para APIs criticas. Quando a base ja tem isso, eu focaria em observabilidade e performance.",
      },
    ],
  },
];

const defaultChecklist = [
  "Sei explicar o que o projeto faz",
  "Sei explicar a stack",
  "Sei explicar o frontend",
  "Sei explicar o backend ou BaaS",
  "Sei explicar banco de dados",
  "Sei explicar autenticacao e seguranca",
  "Sei explicar APIs e integracoes",
  "Sei explicar fluxos principais",
  "Sei explicar deploy e variaveis de ambiente",
  "Sei responder perguntas de entrevista",
];

export const projects: ProjectChapter[] = [
  {
    id: "felpamusic",
    name: "FelpaMusic",
    url: "https://www.felpamusic.com.br",
    repoPath: "C:\\Users\\feema\\felpamusic",
    status: "documented",
    oneLine: "Plataforma musical com IA, audio, editor, creditos, Supabase, automacoes e pipelines externos.",
    problem: "Centralizar criacao, processamento e evolucao de audio em uma interface unica para reduzir etapas manuais entre upload, analise, mix/master, editor e entrega.",
    audience: "Criadores musicais e operadores que precisam de fluxo assistido para audio, IA e automacao.",
    value: "Combina UI de produto, Supabase, webhooks, storage, creditos e servicos de audio em uma experiencia de ponta a ponta.",
    mainFlow: "Usuario entra no painel, cria ou seleciona projeto, envia arquivos, conversa com o fluxo/orquestrador, aciona ferramentas de audio e recebe artefatos processados.",
    technicalDiff: "Uso de pipelines longos e assincronos com contratos entre frontend, Supabase Functions, n8n e servicos de audio como FFmpeg/REAPER em infraestrutura externa.",
    interview30: "FelpaMusic e uma plataforma de criacao musical com IA. Eu trabalhei em uma aplicacao React/TypeScript com Supabase, creditos, storage, editor e automacoes n8n para conduzir fluxos de audio como mix/master, stems, Magic Volumes e FelpaTune.",
    technicalSummary: "O frontend usa React, Vite, TypeScript, Tailwind/shadcn e componentes de produto. A camada de dados usa Supabase Auth, tabelas, storage e functions. Fluxos de audio chamam Edge Functions e webhooks externos; alguns modulos usam estado local para editor e snapshots de runtime.",
    beginnerSummary: "Pense no FelpaMusic como uma oficina de musica online: a tela mostra botoes, chat e editor; o sistema guarda usuario e arquivos; e os servicos por tras processam o audio e devolvem resultados.",
    stack: [
      { left: "Frontend", middle: "React + Vite + TypeScript", right: "src, components, pages", note: "Detectado em package.json." },
      { left: "UI", middle: "Tailwind/shadcn + Radix + lucide", right: "components/ui e componentes de dashboard", note: "Usado para cards, modais, botoes e layout." },
      { left: "Banco/Auth/Storage", middle: "Supabase", right: "integrations/supabase, hooks e functions.invoke", note: "Auth, dados, storage e edge functions." },
      { left: "Automacao", middle: "n8n webhooks", right: "MagicVolumesModal, StemSplitterPanel", note: "Chamadas HTTP para processos externos." },
      { left: "Estado", middle: "React hooks + localStorage", right: "ChatArea, editor", note: "Preferencias de modo e runtime." },
      { left: "Pagamentos/Creditos", middle: "Camada propria de creditos", right: "components/credits, hooks/useCredits", note: "Consumo e compra de creditos no produto." },
    ],
    folders: [
      { left: "src/components/dashboard", middle: "Chat, sidebar, cards e fluxo do painel", right: "Parte central do produto autenticado." },
      { left: "src/components/editor", middle: "Timeline, dropzone, FelpaTune, Magic Volumes", right: "Ferramentas visuais de audio." },
      { left: "src/components/credits", middle: "Saldo, paywall e compra", right: "Controle de consumo." },
      { left: "src/hooks", middle: "Hooks de usuario, credito, runtime", right: "Reuso de estado e queries." },
      { left: "src/integrations/supabase", middle: "Cliente Supabase", right: "Auth, storage e functions." },
      { left: "supabase", middle: "Functions/migrations quando presentes", right: "BaaS e banco." },
    ],
    pages: [
      { left: "Dashboard", middle: "src/components/dashboard/ChatArea.tsx", right: "Chat, projetos, upload e comandos do fluxo." },
      { left: "Editor", middle: "src/components/editor/*", right: "Timeline, importacao de midia, controles e ferramentas." },
      { left: "Creditos", middle: "components/credits/*", right: "Paywall, compra e exibicao de saldo." },
      { left: "Landing/produto", middle: "productCopy.ts", right: "Copy modular para modos MixMaster, Creator e Editor." },
    ],
    components: [
      { left: "ChatArea", middle: "src/components/dashboard/ChatArea.tsx", right: "Composer, mensagens, projetos e envio de arquivo do editor." },
      { left: "EditorDropZone", middle: "src/components/editor/EditorDropZone.tsx", right: "Importa arquivos e URLs usando Supabase Function proxy-media-url." },
      { left: "MagicVolumesModal", middle: "src/components/editor/MagicVolumesModal.tsx", right: "Consome credito, prepara FormData e chama webhook externo." },
      { left: "PurchaseCreditsModal", middle: "src/components/credits/PurchaseCreditsModal.tsx", right: "Fluxo de compra/pagamento de creditos." },
    ],
    endpoints: [
      { left: "proxy-media-url", middle: "Supabase Edge Function", right: "Usada para importar midia remota sem CORS direto." },
      { left: "magic-volume webhook", middle: "POST externo n8n", right: "Processa Magic Volumes com FormData." },
      { left: "Stem splitter webhook", middle: "POST externo", right: "Processamento de stems detectado no frontend." },
      { left: "Supabase Auth", middle: "auth.getSession / auth state", right: "Sessao e autorizacao no cliente." },
    ],
    database: [
      { left: "Projetos", middle: "FelpaProject / Supabase", right: "Organiza arquivos e historico por projeto." },
      { left: "Creditos", middle: "Hooks e tabelas de credito", right: "Controla saldo e consumo." },
      { left: "Storage", middle: "Buckets Supabase", right: "Guarda audio, imagens e artefatos." },
      { left: "Confirmacao", middle: "Parcial", right: "Nao foi possivel confirmar todos os schemas no trecho analisado." },
    ],
    integrations: [
      { left: "Supabase", middle: "Auth, DB, Storage, Functions", right: "Nucleo de dados do app." },
      { left: "n8n", middle: "Webhooks", right: "Orquestracao de tarefas externas." },
      { left: "FFmpeg/REAPER", middle: "Servicos externos", right: "Processamento de audio citado em arquitetura e operacao." },
    ],
    env: [
      { left: "VITE_SUPABASE_URL", middle: "URL do Supabase", right: "Obrigatoria para functions e cliente." },
      { left: "VITE_SUPABASE_PUBLISHABLE_KEY", middle: "Chave publica/anon", right: "Usada no frontend." },
      { left: "Webhooks n8n", middle: "URLs externas", right: "Devem ficar configuradas sem expor segredo." },
    ],
    flows: [
      {
        name: "Importar midia por URL",
        goal: "Adicionar audio/video remoto ao editor sem quebrar por CORS.",
        steps: ["Usuario cola URL", "EditorDropZone chama proxy-media-url", "Supabase Function baixa ou normaliza a midia", "Frontend adiciona o arquivo ao editor"],
        files: ["src/components/editor/EditorDropZone.tsx", "src/integrations/supabase"],
        apis: ["Supabase Function proxy-media-url"],
        interview: "Eu explicaria que a UI nao tenta baixar tudo direto do browser; ela usa uma function como ponte para controlar CORS, autenticacao e formato de resposta.",
      },
      {
        name: "Magic Volumes",
        goal: "Processar volumes/stems consumindo creditos de forma controlada.",
        steps: ["Usuario abre ferramenta", "Sistema verifica saldo", "Consome credito", "Monta FormData", "Chama webhook n8n", "Carrega resultado no editor"],
        files: ["src/components/editor/MagicVolumesModal.tsx", "src/hooks/useCredits"],
        apis: ["n8n webhook magic-volume"],
        interview: "O ponto tecnico e a separacao entre permissao economica, preparacao de payload e processamento assincrono externo.",
      },
    ],
    codeFiles: [
      {
        path: "src/components/dashboard/ChatArea.tsx",
        purpose: "Componente central do fluxo de chat, projetos, estado do editor e envio de arquivos.",
        parts: ["Estados do composer e runtime", "Persistencia de modo em localStorage", "Envio de arquivo do editor", "Renderizacao de projetos e mensagens", "Tratamento de envio/carregamento"],
        beginner: "E a tela onde o usuario conversa com o produto e envia coisas para processamento.",
        interview: "Eu destacaria como o componente coordena UI, estado, arquivos e integracao com o fluxo sem colocar segredo no frontend.",
      },
      {
        path: "src/components/editor/MagicVolumesModal.tsx",
        purpose: "Modal de ferramenta de audio que valida creditos e chama processamento externo.",
        parts: ["Le saldo", "Calcula custo", "Consome credito", "Monta payload", "Chama webhook", "Mostra progresso/erro"],
        beginner: "E um formulario inteligente que so deixa processar se o usuario tiver saldo.",
        interview: "Eu falaria sobre validacao de fluxo antes da chamada externa e sobre falha honesta quando o processamento nao responde.",
      },
    ],
    libraries: [
      { left: "react", middle: "UI", right: "Renderiza componentes e estado." },
      { left: "@supabase/supabase-js", middle: "Dados/Auth", right: "Cliente para banco, storage e auth." },
      { left: "framer-motion", middle: "UI", right: "Animacoes leves." },
      { left: "recharts", middle: "Graficos", right: "Visualizacoes quando usadas." },
      { left: "zod", middle: "Validacao", right: "Schemas quando presentes." },
    ],
    security: ["Sessao via Supabase Auth.", "Chaves secretas nao devem aparecer no frontend.", "Functions/webhooks devem validar origem e payload.", "Credit consumption precisa ser idempotente no backend."],
    errors: ["Erros de importacao de URL sao tratados com toast/log.", "Falha de webhook deve aparecer como erro de processamento.", "Saldo insuficiente abre paywall em vez de fingir processamento."],
    performance: ["Processamento pesado fica fora do browser.", "Editor usa estados locais para evitar chamadas desnecessarias.", "Pode melhorar com filas e status de jobs padronizado."],
    ux: ["Fluxo guiado por chat/editor.", "Ferramentas com feedback visual.", "A complexidade tecnica fica escondida em modais e estados."],
    pending: ["Nao foi possivel confirmar todos os schemas Supabase no codigo analisado.", "Pipelines externos precisam de validacao por ambiente."],
    interview: commonInterview("FelpaMusic"),
    checklist: defaultChecklist,
  },
  {
    id: "billie-brain",
    name: "Billie Brain",
    url: "https://www.billie-brain.felpamusic.com.br",
    repoPath: "C:\\Users\\feema\\billie-joe",
    status: "documented",
    oneLine: "Assistente de programacao com chat, Billie Studio, Supabase, wallet, usage, billing e backend FastAPI local.",
    problem: "Dar ao usuario uma experiencia tipo agente de codigo com area protegida, historico, custos, creditos e um studio visual para revisar interfaces.",
    audience: "Desenvolvedores e criadores que querem um assistente de engenharia com contexto de produto.",
    value: "Une frontend publico, app autenticado, chat via Edge Function, tabelas Supabase e backend local FastAPI para capacidades futuras/locais.",
    mainFlow: "Usuario cria conta, entra no app, abre chat, envia mensagem, recebe resposta por streaming, acompanha uso/custos e usa Billie Studio para snapshots visuais.",
    technicalDiff: "A separacao entre app web Supabase-first e backend FastAPI local permite operar produto SaaS e manter capacidades locais/private-first.",
    interview30: "Billie Brain e um AI dev tool. Ele tem landing, login Supabase, dashboard, chat com Edge Function, wallet/usage/billing e uma pagina Billie Studio para preview visual com snapshots locais e exportacao por clipboard/share.",
    technicalSummary: "O frontend em apps/web usa React, Vite, TanStack Router/Start, Supabase e Recharts. A area /app e protegida por sessao Supabase. O chat chama /functions/v1/chat com bearer token e trata streaming. O backend apps/api usa FastAPI, SQLModel, provider registry, rotas de projects, tasks, memory, uploads, diagnostics e chat local.",
    beginnerSummary: "E como um ChatGPT para programacao dentro de um produto: o usuario conversa, o sistema guarda conversas e calcula uso. O Studio e uma tela para carregar uma URL, testar visual e salvar um resumo local.",
    stack: [
      { left: "Frontend", middle: "React 19 + Vite + TanStack Router/Start", right: "apps/web/src/routes", note: "Rotas publicas e protegidas." },
      { left: "Backend local", middle: "FastAPI + SQLModel", right: "apps/api", note: "API local para projetos, chat, memory, diagnostics e ferramentas." },
      { left: "Banco/Auth", middle: "Supabase", right: "profiles, conversations, messages, usage_events, wallet_transactions, user_settings", note: "Detectado em types.ts e queries." },
      { left: "Chat", middle: "Supabase Edge Function /functions/v1/chat", right: "app.chat.tsx", note: "Streaming com token de sessao." },
      { left: "Billing", middle: "Stripe pendente por flag", right: "app.wallet.tsx/app.billing.tsx", note: "UI desabilita top-up sem Stripe." },
      { left: "Visual", middle: "Tailwind, Radix, lucide, Recharts, Three", right: "package.json", note: "UI, graficos e cenas." },
    ],
    folders: [
      { left: "apps/web/src/routes", middle: "Rotas TanStack", right: "Landing, login, app, chat, wallet, billing, Studio." },
      { left: "apps/web/src/integrations/supabase", middle: "Cliente, server client e auth middleware", right: "Auth e queries." },
      { left: "apps/web/src/components/app", middle: "AppShell", right: "Sidebar, usuario, wallet summary." },
      { left: "apps/api", middle: "FastAPI local", right: "Provider registry, chat, memory, tasks, uploads." },
      { left: "packages/*", middle: "Workspaces internos", right: "Pacotes compartilhados quando presentes." },
    ],
    pages: [
      { left: "/", middle: "routes/index.tsx", right: "Landing publica." },
      { left: "/billie-studio", middle: "routes/billie-studio.tsx", right: "Preview/editor visual com iframe, snapshots e referencias." },
      { left: "/app", middle: "routes/app.index.tsx", right: "Dashboard protegido com conversas, tokens, custo e wallet." },
      { left: "/app/chat", middle: "routes/app.chat.tsx", right: "Chat com Edge Function e streaming." },
      { left: "/app/wallet", middle: "routes/app.wallet.tsx", right: "Saldo, transacoes e top-up desabilitado sem Stripe." },
      { left: "/app/settings", middle: "routes/app.settings.tsx", right: "Persistencia de user_settings." },
    ],
    components: [
      { left: "AppShell", middle: "components/app/AppShell.tsx", right: "Layout autenticado, saldo e navegacao." },
      { left: "useAuth", middle: "hooks/use-auth.ts", right: "Sessao Supabase e signOut." },
      { left: "Billie Studio route", middle: "routes/billie-studio.tsx", right: "Iframe, viewport, localStorage, clipboard e share." },
      { left: "Chat route", middle: "routes/app.chat.tsx", right: "Lista conversas, composer e chamada Edge Function." },
    ],
    endpoints: [
      { left: "/functions/v1/chat", middle: "POST", right: "Recebe mensagem, conversationId e modelo; retorna streaming." },
      { left: "/api/health", middle: "GET FastAPI", right: "Health local." },
      { left: "/api/projects", middle: "GET/POST FastAPI", right: "Projetos locais." },
      { left: "/api/chat/stream", middle: "POST FastAPI", right: "Streaming local." },
      { left: "/api/memory", middle: "GET/POST FastAPI", right: "Memoria local/RAG." },
      { left: "/api/models/route", middle: "POST FastAPI", right: "Roteamento local de modelos." },
    ],
    database: [
      { left: "profiles", middle: "display_name, plan", right: "Dados de perfil e plano." },
      { left: "conversations", middle: "id, user_id, title", right: "Historico de chats." },
      { left: "messages", middle: "conversation_id, role, content, tokens/cost", right: "Mensagens e custo." },
      { left: "usage_events", middle: "model, tokens, cost", right: "Uso por modelo/dia." },
      { left: "wallet_transactions", middle: "balance_after_cents, amount", right: "Saldo e historico." },
      { left: "user_settings", middle: "workspace_name, default_model, policies", right: "Preferencias do agente." },
      { left: "github_connections", middle: "username/user_id", right: "Estado do conector GitHub." },
    ],
    integrations: [
      { left: "Supabase Auth", middle: "login/signup/session", right: "Autenticacao." },
      { left: "Supabase Edge Function", middle: "chat", right: "Resposta IA via streaming." },
      { left: "Stripe", middle: "flag VITE_STRIPE_CHECKOUT_ENABLED", right: "Marcado como pendente/desabilitado quando nao configurado." },
      { left: "GitHub", middle: "github_connections", right: "Estado do conector; OAuth real depende de configuracao." },
    ],
    env: [
      { left: "VITE_SUPABASE_URL", middle: "Supabase frontend", right: "Obrigatoria para auth/chat no cliente." },
      { left: "VITE_SUPABASE_PUBLISHABLE_KEY", middle: "Chave publica", right: "Usada em chamadas Edge Function." },
      { left: "SUPABASE_SERVICE_ROLE_KEY", middle: "Server-side", right: "Usada apenas no servidor; nunca expor." },
      { left: "VITE_STRIPE_CHECKOUT_ENABLED", middle: "Flag de pagamento", right: "Controla botoes de wallet/billing." },
    ],
    flows: [
      {
        name: "Chat com agente",
        goal: "Enviar mensagem para IA e persistir conversa.",
        steps: ["Carrega sessao Supabase", "Cria/seleciona conversa", "POST para /functions/v1/chat", "Ler streaming", "Atualizar UI incremental", "Recarregar conversas"],
        files: ["apps/web/src/routes/app.chat.tsx", "apps/web/src/integrations/supabase/client.ts"],
        apis: ["Supabase Edge Function /functions/v1/chat", "conversations", "messages"],
        interview: "Eu explicaria o streaming como uma resposta em pedacos, que melhora UX e permite tratar 402/429 de forma especifica.",
      },
      {
        name: "Billie Studio snapshot",
        goal: "Criar material local de revisao visual sem prometer edicao real de codigo.",
        steps: ["Usuario carrega URL", "Escolhe viewport", "Registra instrucao", "Adiciona referencias", "Copia/salva snapshot em localStorage"],
        files: ["apps/web/src/routes/billie-studio.tsx"],
        apis: ["localStorage", "Clipboard API", "Web Share API"],
        interview: "Eu destacaria que a funcao e honesta: salva snapshots e referencias locais; nao finge aplicar patch em repositorio.",
      },
    ],
    codeFiles: [
      {
        path: "apps/web/src/routes/app.chat.tsx",
        purpose: "Implementa a interface de chat, queries Supabase e chamada streaming da Edge Function.",
        parts: ["Carregamento de conversas", "Sessao Supabase", "POST com bearer token", "Tratamento de erro", "Atualizacao incremental da resposta"],
        beginner: "E a pagina onde o usuario escreve e recebe resposta do assistente.",
        interview: "Eu falaria sobre streaming, persistencia e tratamento de erro por status como 402 e 429.",
      },
      {
        path: "apps/web/src/routes/app.wallet.tsx",
        purpose: "Mostra saldo e transacoes, mas deixa top-up desabilitado se Stripe nao estiver configurado.",
        parts: ["Consulta wallet_transactions", "Calcula saldo", "Exibe presets", "Desabilita acoes por flag", "Mostra mensagem honesta"],
        beginner: "E a tela do saldo. Ela nao cobra de verdade se a integracao de pagamento nao estiver ligada.",
        interview: "Eu usaria esse arquivo como exemplo de UI honesta para integracao externa pendente.",
      },
      {
        path: "apps/api",
        purpose: "Backend local FastAPI para capacidades private/local-first.",
        parts: ["Rotas de health", "Projetos", "Chat", "Tasks", "Memory", "Uploads", "Diagnostics", "Provider registry"],
        beginner: "E um servidor local que pode executar funcoes que nao dependem do navegador.",
        interview: "Eu explicaria a separacao entre produto web em Supabase e capacidades locais via FastAPI.",
      },
    ],
    libraries: [
      { left: "@supabase/supabase-js", middle: "Auth, DB, Edge Functions", right: "Cliente principal de dados." },
      { left: "@tanstack/react-router/start", middle: "Rotas", right: "Estrutura de paginas." },
      { left: "recharts", middle: "Usage/dashboard", right: "Graficos de uso." },
      { left: "fastapi", middle: "Backend local", right: "API Python." },
      { left: "sqlmodel", middle: "Banco local", right: "Modelagem SQL no backend." },
    ],
    security: ["Rotas /app exigem sessao Supabase.", "Service role fica no servidor.", "Wallet/top-up nao finge Stripe quando flag esta off.", "FastAPI local precisa validar CORS e payload por ambiente."],
    errors: ["Supabase sem env mostra cliente desabilitado/erro claro.", "Chat trata Edge Function nao configurada.", "Wallet/Billing mostram Stripe pendente sem cobrar."],
    performance: ["Streaming reduz tempo percebido no chat.", "Queries agregam uso e saldo.", "Pode melhorar com paginacao de conversas e cache."],
    ux: ["AppShell consistente.", "Billing e connectors tem estados honestos.", "Studio usa timeline local e controles de viewport."],
    pending: ["Confirmar deploy da Edge Function e variaveis em producao.", "Stripe e conectores externos dependem de configuracao.", "Backend FastAPI local e desacoplado do frontend de producao."],
    interview: commonInterview("Billie Brain"),
    checklist: defaultChecklist,
  },
  {
    id: "vitrinno",
    name: "Vitrinno",
    url: "https://www.vitrinno.felpamusic.com.br",
    repoPath: "C:\\Users\\feema\\vitrinno",
    status: "documented",
    oneLine: "Rede social/musical para artistas, catalogo, feed, perfil, studio, upload e APIs serverless.",
    problem: "Criar uma experiencia social para descoberta musical, publicacao de releases, feed e perfil, evitando dados falsos quando backend nao tem conteudo.",
    audience: "Artistas, ouvintes e criadores que precisam publicar, descobrir e interagir em torno de musica.",
    value: "Une descoberta, perfil, feed, catalogo e studio em uma base React/TanStack com API v1 e fallback local honesto.",
    mainFlow: "Usuario acessa Hall, cria conta/login, publica post, edita perfil ou salva release pelo Studio Upload.",
    technicalDiff: "Camada src/lib/vitrinno-api.ts centraliza chamadas, fallback local e contratos de API para manter UI e backend alinhados.",
    interview30: "Vitrinno e uma aplicacao social musical em React/TanStack. Ela tem rotas para Hall, Feed, Catalogo, Perfil, Studio e Upload, com API /api/v1 para auth, posts, perfil, settings, catalogo e upload.",
    technicalSummary: "O app usa Vite/TanStack Router, React, serverless API, localStorage fallback e endpoint unificado /api/v1. A documentacao do codigo mostra chamadas para auth/login, auth/signup, feed, profile, upload/direct, settings/preferences e colecoes como catalog/library/messages/notifications.",
    beginnerSummary: "E como uma rede social para musica: voce entra, ve feed, edita perfil, publica rascunho de release e navega pelo catalogo. A API e quem guarda ou busca esses dados.",
    stack: [
      { left: "Frontend", middle: "React + Vite + TanStack Router/Start", right: "src/routes", note: "Rotas por arquivo." },
      { left: "API", middle: "Serverless /api/v1", right: "src/lib/vitrinno-api.ts e api", note: "Auth, feed, perfil, upload e colecoes." },
      { left: "Persistencia local", middle: "localStorage", right: "vitrinno-api.ts", note: "Fallback de desenvolvimento/offline." },
      { left: "UI", middle: "Tailwind/Radix/lucide/Recharts", right: "package.json", note: "Interface e graficos." },
      { left: "Banco", middle: "Postgres/Supabase Storage quando configurado", right: "API de upload e DATABASE_URL", note: "Confirmacao de banco depende de env/deploy." },
    ],
    folders: [
      { left: "src/routes", middle: "Paginas TanStack", right: "Hall, login, feed, catalogo, profile, studio." },
      { left: "src/lib/vitrinno-api.ts", middle: "Cliente de API", right: "Centraliza endpoints e fallback." },
      { left: "src/components", middle: "Componentes UI", right: "Layout e blocos reutilizaveis." },
      { left: "api", middle: "Serverless", right: "Rotas /api/v1 quando presentes." },
    ],
    pages: [
      { left: "/", middle: "src/routes/index.tsx", right: "Hall/descoberta." },
      { left: "/login", middle: "src/routes/login.tsx", right: "Entrar/criar conta." },
      { left: "/feed", middle: "src/routes/feed.tsx", right: "Timeline e publicacao." },
      { left: "/profile/edit", middle: "src/routes/profile.edit.tsx", right: "Editar perfil." },
      { left: "/studio/upload", middle: "src/routes/studio.upload.tsx", right: "Criar rascunho de release." },
      { left: "/album/$trackId", middle: "src/routes/album.$trackId.tsx", right: "Detalhe de faixa/album." },
    ],
    components: [
      { left: "API client", middle: "src/lib/vitrinno-api.ts", right: "Funcoes de auth, feed, profile, upload e settings." },
      { left: "Rotas dinamicas", middle: "u.$handle/post.$postId/album.$trackId", right: "Estados por parametro." },
      { left: "Studio Upload", middle: "studio.upload.tsx", right: "Formulario de titulo/genero/arquivo." },
    ],
    endpoints: [
      { left: "/api/v1/auth/login", middle: "POST", right: "Login." },
      { left: "/api/v1/auth/signup", middle: "POST", right: "Cadastro." },
      { left: "/api/v1/auth/me", middle: "GET", right: "Usuario atual." },
      { left: "/api/v1/feed", middle: "GET/POST", right: "Listar/publicar posts." },
      { left: "/api/v1/profile", middle: "GET/PATCH", right: "Perfil atual." },
      { left: "/api/v1/upload/direct", middle: "POST", right: "Salvar release/rascunho." },
      { left: "/api/v1/settings/preferences", middle: "POST", right: "Preferencias." },
    ],
    database: [
      { left: "Sessao", middle: "vitrinno_session", right: "Cookie/API ou estado local conforme ambiente." },
      { left: "Posts", middle: "FeedPost", right: "Feed e detalhe de post." },
      { left: "Releases", middle: "ReleaseDraft", right: "Studio Upload e album/faixa." },
      { left: "Perfil", middle: "VitrinnoUser", right: "Nome, handle, bio e avatar." },
      { left: "Storage", middle: "Supabase Storage", right: "Upload fisico quando configurado." },
    ],
    integrations: [
      { left: "Supabase Storage", middle: "signed-url/direct upload", right: "Arquivo fisico de audio quando configurado." },
      { left: "Google OAuth", middle: "Login social informativo/pendente", right: "Depende de provedor configurado." },
      { left: "API serverless", middle: "/api/v1", right: "Contratos do produto." },
    ],
    env: [
      { left: "DATABASE_URL", middle: "Banco", right: "Obrigatoria se API usa Postgres." },
      { left: "SUPABASE_SERVICE_ROLE_KEY", middle: "Storage server-side", right: "Necessaria para upload fisico seguro." },
      { left: "SUPABASE_STORAGE_BUCKET", middle: "Bucket", right: "Opcional para trocar nome do bucket." },
    ],
    flows: [
      {
        name: "Publicar post",
        goal: "Criar conteudo no feed.",
        steps: ["Usuario escreve post", "Frontend valida vazio", "POST /api/v1/feed", "Atualiza lista", "Fallback local se API indisponivel com aviso honesto"],
        files: ["src/routes/feed.tsx", "src/lib/vitrinno-api.ts"],
        apis: ["/api/v1/feed"],
        interview: "Eu explicaria a camada de API centralizada como forma de evitar endpoints espalhados e divergencia de contrato.",
      },
      {
        name: "Salvar release",
        goal: "Criar rascunho de faixa/album no Studio.",
        steps: ["Usuario informa titulo/genero", "Seleciona audio/*", "Solicita upload/signed URL se houver storage", "Salva release em /api/v1/upload/direct"],
        files: ["src/routes/studio.upload.tsx", "src/lib/vitrinno-api.ts"],
        apis: ["/api/v1/upload/signed-url", "/api/v1/upload/direct"],
        interview: "O ponto tecnico e separar upload fisico de metadados do release.",
      },
    ],
    codeFiles: [
      {
        path: "src/lib/vitrinno-api.ts",
        purpose: "Cliente de API e fallback local do produto.",
        parts: ["Estado local", "Funcao api()", "Auth", "Feed", "Colecoes", "Profile", "Upload", "Settings"],
        beginner: "E o arquivo que conversa com o servidor.",
        interview: "Eu destacaria como ele padroniza payload, erro e fallback para a UI nao ficar inconsistente.",
      },
    ],
    libraries: [
      { left: "@tanstack/react-router", middle: "Rotas", right: "Paginas file-based." },
      { left: "pg", middle: "Banco", right: "Acesso Postgres server-side." },
      { left: "recharts", middle: "Graficos", right: "Analytics/visuais." },
      { left: "zod", middle: "Validacao", right: "Schemas quando usados." },
    ],
    security: ["Auth via endpoints /api/v1/auth.", "Upload fisico deve usar service role apenas no servidor.", "Fallback local precisa ser sinalizado como ambiente local/dev."],
    errors: ["api() limpa sessao em 401.", "Upload deve diferenciar falha de storage de rascunho sem arquivo.", "Funcoes pendentes precisam disabled/mensagem honesta."],
    performance: ["Rotas pequenas por arquivo.", "Pode melhorar com paginacao de feed/catalogo.", "Storage direto evita passar arquivo grande pelo frontend quando assinado."],
    ux: ["Estados vazios honestos em catalogo/biblioteca.", "CTA para login quando acao exige usuario.", "Rotas dinamicas mostram inexistente sem inventar dados."],
    pending: ["Confirmar schemas reais de banco no deploy.", "OAuth social e monetizacao dependem de configuracao externa."],
    interview: commonInterview("Vitrinno"),
    checklist: defaultChecklist,
  },
  {
    id: "helena-video",
    name: "Helena Video",
    url: "https://www.helena-video.felpamusic.com.br",
    repoPath: "C:\\Users\\feema\\helena-video",
    status: "documented",
    oneLine: "Studio de video com auth Supabase, APIs serverless, jobs Helena e fluxos de chat/studio.",
    problem: "Oferecer uma central de criacao de video assistida por IA com paginas protegidas, chat, studio e integracoes backend.",
    audience: "Criadores de video e operadores que precisam gerar, organizar e publicar assets de video.",
    value: "Combina frontend TanStack, Supabase Auth, API /api/app e proxy /api/helena para jobs modulares.",
    mainFlow: "Usuario loga, entra no Studio, envia prompt, frontend cria job local e chama /api/helena/jobs/module2; chat usa /api/app/chat.",
    technicalDiff: "Ha dois mundos conectados: Supabase Auth no frontend e serverless API propria que aceita JWT Supabase ou cookie helena_session.",
    interview30: "Helena Video e uma plataforma de video com login Supabase, area protegida, Studio, chat e APIs serverless. O Studio chama jobs Helena, e a API propria cuida de auth, conta, projetos e integracoes.",
    technicalSummary: "O frontend usa Vite/React/TanStack Router. Rotas privadas ficam sob /_app e checam sessao Supabase/local QA. A API /api/app/[...path].js implementa auth, Google OAuth, sessoes helena_session e endpoints de produto. /api/helena/jobs/[module].js encaminha jobs para backend externo/webhook.",
    beginnerSummary: "E uma aplicacao de video: voce entra, abre o Studio, pede uma tarefa e o servidor encaminha isso para uma maquina ou automacao que faz o trabalho.",
    stack: [
      { left: "Frontend", middle: "React + Vite + TanStack Router/Start", right: "src/routes", note: "Rotas publicas e protegidas." },
      { left: "Auth", middle: "Supabase Auth", right: "login/reset/_app", note: "Login, cadastro, reset e sessao." },
      { left: "API app", middle: "Vercel serverless JS", right: "api/app/[...path].js", note: "Auth, account, projects, billing, chat." },
      { left: "API Helena", middle: "Proxy jobs", right: "api/helena/jobs/[module].js", note: "Encaminha para webhook/API externa." },
      { left: "Banco", middle: "Postgres/Supabase", right: "helena_sessions e tabelas app", note: "Confirmado por queries na API." },
    ],
    folders: [
      { left: "src/routes", middle: "Rotas TanStack", right: "/login, /reset-password, /_app/*." },
      { left: "src/lib/helena-product-api.ts", middle: "Cliente de produto", right: "Chat e jobs com fallback local honesto." },
      { left: "api/app/[...path].js", middle: "Backend serverless", right: "Auth, sessao e produto." },
      { left: "api/helena", middle: "Proxy Helena", right: "Jobs e capacidades externas." },
      { left: "src/integrations/supabase", middle: "Cliente/auth middleware", right: "Supabase no frontend/server." },
    ],
    pages: [
      { left: "/login", middle: "src/routes/login.tsx", right: "Email/senha, signup, OAuth Google e reset." },
      { left: "/reset-password", middle: "src/routes/reset-password.tsx", right: "Atualizacao de senha Supabase." },
      { left: "/_app/studio", middle: "src/routes/_app.studio.tsx", right: "Comando de geracao e job module2." },
      { left: "/_app/chat", middle: "src/routes/_app.chat.tsx", right: "Chat com /api/app/chat." },
      { left: "/_app/ajustes", middle: "src/routes/_app.ajustes.tsx", right: "Perfil e logout." },
    ],
    components: [
      { left: "AppSidebar", middle: "src/components/AppSidebar.tsx", right: "Navegacao e logout Supabase." },
      { left: "TopBar", middle: "src/components/TopBar.tsx", right: "Status /api/app/health." },
      { left: "helena-product-api", middle: "src/lib/helena-product-api.ts", right: "Funcoes de chat e job." },
    ],
    endpoints: [
      { left: "/api/app/health", middle: "GET", right: "Status backend." },
      { left: "/api/app/auth/login", middle: "POST", right: "Login API propria." },
      { left: "/api/app/auth/google", middle: "GET", right: "OAuth Google backend." },
      { left: "/api/app/chat", middle: "POST", right: "Resposta do chat." },
      { left: "/api/helena/jobs/module2", middle: "POST", right: "Job de Studio." },
      { left: "/api/ssr", middle: "ANY", right: "SSR handler." },
    ],
    database: [
      { left: "helena_sessions", middle: "token_hash, user_id, expires_at", right: "Cookie helena_session." },
      { left: "Supabase Auth", middle: "JWT/user", right: "Sessao frontend." },
      { left: "Projects/jobs", middle: "API app", right: "Endpoints preparados para produto." },
    ],
    integrations: [
      { left: "Supabase", middle: "Auth e client server", right: "Login, signup, reset, JWT." },
      { left: "Google OAuth", middle: "api/app/auth/google", right: "Callback e userinfo." },
      { left: "HELENA_VIDEO_API_URL", middle: "Proxy", right: "Backend externo." },
      { left: "HELENA_VIDEO_N8N_JOB_WEBHOOK_URL", middle: "Job webhook", right: "Alternativa de automacao." },
    ],
    env: [
      { left: "SUPABASE_URL", middle: "Auth/API", right: "Servidor." },
      { left: "SUPABASE_SERVICE_ROLE_KEY", middle: "Admin client", right: "Somente server-side." },
      { left: "GOOGLE_CLIENT_ID/SECRET", middle: "OAuth", right: "Somente no servidor." },
      { left: "HELENA_VIDEO_API_URL", middle: "Proxy", right: "Endpoint externo." },
      { left: "DATABASE_URL", middle: "Postgres", right: "API propria." },
    ],
    flows: [
      {
        name: "Studio generate",
        goal: "Criar job de video/IA.",
        steps: ["Usuario preenche prompt", "UI valida vazio", "Cria job local", "POST /api/helena/jobs/module2", "Mostra running/complete/erro"],
        files: ["src/routes/_app.studio.tsx", "src/lib/helena-product-api.ts", "api/helena/jobs/[module].js"],
        apis: ["/api/helena/jobs/module2"],
        interview: "Eu explicaria como a UI nao faz o processamento pesado; ela cria o pedido e a API encaminha para o backend de video.",
      },
      {
        name: "Login e rota protegida",
        goal: "Bloquear area interna sem sessao.",
        steps: ["Usuario faz login Supabase", "Sessao fica no storage", "Rota /_app verifica sessao", "Sem sessao redireciona para /login"],
        files: ["src/routes/login.tsx", "src/routes/_app.tsx", "src/hooks/use-current-user.ts"],
        apis: ["Supabase Auth"],
        interview: "O ponto importante e proteger a rota, nao apenas esconder botoes.",
      },
    ],
    codeFiles: [
      {
        path: "src/lib/helena-product-api.ts",
        purpose: "Cliente que envia mensagens e jobs para as APIs serverless.",
        parts: ["post()", "Token Supabase quando existe", "Fallback local", "sendChatMessage", "createStudioJob"],
        beginner: "E o arquivo que chama o servidor quando o usuario clica em gerar ou enviar chat.",
        interview: "Eu mostraria como ele centraliza chamadas e evita espalhar fetch por paginas.",
      },
      {
        path: "api/app/[...path].js",
        purpose: "Backend serverless principal.",
        parts: ["Auth", "Sessoes cookie", "Google OAuth", "Account", "Projetos", "Chat", "Health"],
        beginner: "E um servidor dentro do deploy que responde chamadas /api/app.",
        interview: "Eu destacaria a compatibilidade entre JWT Supabase e cookie proprio.",
      },
    ],
    libraries: [
      { left: "@supabase/supabase-js", middle: "Auth", right: "Sessao e reset." },
      { left: "@tanstack/react-router", middle: "Rotas", right: "File routes." },
      { left: "pg", middle: "Banco serverless", right: "Queries na API." },
      { left: "playwright", middle: "QA", right: "Testes E2E/visual." },
    ],
    security: ["Rotas /_app protegidas por sessao.", "Cookie helena_session HttpOnly no backend.", "OAuth state cookie para Google.", "Service role nao deve ir ao frontend."],
    errors: ["API client preserva fallback local para dev.", "TopBar consulta health e mostra status.", "Jobs devem mostrar erro honesto se webhook/API falhar."],
    performance: ["Serverless evita servidor dedicado para app API.", "Jobs pesados ficam externos.", "Pode melhorar com status polling ou SSE para jobs longos."],
    ux: ["Sidebar clara.", "Login tem recuperar senha.", "Studio precisa sempre indicar status real de job."],
    pending: ["Unificar arquitetura Supabase Auth + helena_session se necessario.", "Confirmar todos os endpoints com DATABASE_URL real em producao."],
    interview: commonInterview("Helena Video"),
    checklist: defaultChecklist,
  },
  {
    id: "verdant-crm",
    name: "Verdant CRM",
    url: "https://www.verdant-crm.felpamusic.com.br",
    repoPath: "C:\\Users\\feema\\CRM-Verdant",
    status: "documented",
    oneLine: "CRM SaaS com frontend TanStack, backend Express/Prisma/Postgres, workspaces, permissoes, inbox e automacoes.",
    problem: "Organizar leads, funis, contatos, empresas, tarefas, inbox, integracoes e relatorios em uma operacao CRM multi-workspace.",
    audience: "Times comerciais que precisam acompanhar leads, conversas, tarefas e automacoes.",
    value: "Mostra arquitetura SaaS classica: frontend separado, API REST, auth, workspace, permissoes, Prisma e Postgres.",
    mainFlow: "Usuario cadastra/login, entra no workspace, navega por dashboard, leads, funis, inbox, contatos, tarefas e configuracoes.",
    technicalDiff: "Backend tem middleware de auth/permissao, services por dominio, Prisma models e rotas REST protegidas por workspace.",
    interview30: "Verdant CRM e um CRM SaaS em React/TanStack com backend Express, Prisma e Postgres. Ele cobre autenticao, workspace, leads, pipelines, inbox, tarefas, integracoes, webhooks, API keys, relatorios e billing.",
    technicalSummary: "O frontend usa Vite/TanStack Router e um cliente API com token no localStorage. O backend usa Express Router, PrismaClient, Zod, JWT/sessoes e rotas separadas para auth, CRM, inbox, platform, reports e public webhooks.",
    beginnerSummary: "E um sistema para equipe comercial: cada lead passa por etapas, conversas ficam no inbox e os dados sao guardados no banco.",
    stack: [
      { left: "Frontend", middle: "React + Vite + TanStack Router/Start", right: "src/routes", note: "Area login e /_app." },
      { left: "API", middle: "Node/Express", right: "backend/src/routes", note: "REST /api/v1." },
      { left: "Banco/ORM", middle: "Postgres + Prisma", right: "backend/prisma/schema.prisma", note: "Models SaaS." },
      { left: "Auth", middle: "Tokens + session table", right: "auth.service.ts, middleware/auth.ts", note: "Workspace e permissoes." },
      { left: "Integracoes", middle: "Evolution WhatsApp/webhooks", right: "services/channel-adapters", note: "Canais externos." },
    ],
    folders: [
      { left: "src/routes", middle: "Frontend", right: "Login/signup e rotas protegidas." },
      { left: "src/lib/api.ts", middle: "API client", right: "Tokens e workspaceId." },
      { left: "backend/src/routes", middle: "Express routers", right: "auth, crm, inbox, platform, reports, public." },
      { left: "backend/src/services", middle: "Regras de negocio", right: "auth, crm, inbox, events, audit." },
      { left: "backend/prisma", middle: "Schema e seed", right: "Modelos e dados iniciais." },
    ],
    pages: [
      { left: "/login", middle: "src/routes/login.tsx", right: "Entrar." },
      { left: "/signup", middle: "src/routes/signup.tsx", right: "Criar conta/workspace." },
      { left: "/_app/dashboard", middle: "src/routes/_app.dashboard.tsx", right: "Resumo operacional." },
      { left: "/_app/leads", middle: "src/routes/_app.leads.tsx", right: "Lista/funil de leads." },
      { left: "/_app/inbox", middle: "src/routes/_app.inbox.tsx", right: "Conversas." },
      { left: "/_app/integracoes", middle: "src/routes/_app.integracoes.tsx", right: "Canais e integracoes." },
    ],
    components: [
      { left: "API client", middle: "src/lib/api.ts", right: "Adiciona Authorization e x-workspace-id." },
      { left: "ThemeToggle", middle: "src/components/theme-toggle.tsx", right: "Tema persistido em localStorage." },
      { left: "Routes _app", middle: "src/routes/_app*.tsx", right: "Telas principais do CRM." },
    ],
    endpoints: [
      { left: "/api/v1/auth/login", middle: "POST", right: "Login." },
      { left: "/api/v1/auth/register", middle: "POST", right: "Cria usuario e workspace." },
      { left: "/api/v1/leads", middle: "GET/POST", right: "CRUD de leads." },
      { left: "/api/v1/leads/:id/move", middle: "POST", right: "Mudar etapa." },
      { left: "/api/v1/conversations", middle: "GET", right: "Inbox." },
      { left: "/api/v1/channels", middle: "GET/POST", right: "Canais." },
      { left: "/api/v1/reports/dashboard", middle: "GET", right: "Metricas." },
      { left: "/api/v1/public/webhooks/evolution/:channelId", middle: "POST", right: "Entrada webhook Evolution." },
    ],
    database: [
      { left: "User/Session", middle: "Auth", right: "Login e refresh/revogacao." },
      { left: "Workspace/WorkspaceMember/Role", middle: "Multi-tenant", right: "Permissoes por workspace." },
      { left: "Lead/Pipeline/PipelineStage", middle: "CRM", right: "Funil comercial." },
      { left: "Contact/Company/Task", middle: "Relacionamentos", right: "Entidades de operacao." },
      { left: "Conversation/Message/Channel", middle: "Inbox", right: "Mensageria e canais." },
      { left: "Integration/Webhook/ApiKey/AuditLog", middle: "Plataforma", right: "Extensibilidade e auditoria." },
    ],
    integrations: [
      { left: "Google OAuth", middle: "auth.routes.ts", right: "Fluxo com state cookie e userinfo." },
      { left: "Evolution WhatsApp", middle: "channel adapter + public webhook", right: "Mensagens externas." },
      { left: "Webhooks", middle: "webhook delivery", right: "Eventos para sistemas externos." },
    ],
    env: [
      { left: "VITE_API_BASE_URL", middle: "Frontend", right: "Base /api/v1." },
      { left: "DATABASE_URL", middle: "Backend Prisma", right: "Postgres." },
      { left: "JWT_SECRET", middle: "Auth", right: "Assinatura de tokens." },
      { left: "GOOGLE_CLIENT_ID/SECRET", middle: "OAuth", right: "Login Google." },
    ],
    flows: [
      {
        name: "Cadastro SaaS",
        goal: "Criar usuario, workspace e dados iniciais.",
        steps: ["Frontend chama /auth/register", "Backend valida Zod", "Auth service cria usuario/workspace/role/pipeline", "Retorna tokens e workspaceId", "Frontend salva em localStorage"],
        files: ["src/lib/api.ts", "backend/src/routes/auth.routes.ts", "backend/src/services/auth.service.ts"],
        apis: ["/api/v1/auth/register"],
        interview: "Eu destacaria que o cadastro cria o contexto multi-tenant inteiro, nao apenas um usuario solto.",
      },
      {
        name: "Mover lead no funil",
        goal: "Atualizar etapa e registrar historico.",
        steps: ["Usuario move lead", "API valida permissao leads.update", "Service atualiza lead", "Cria history/audit", "Dashboard reflete metricas"],
        files: ["backend/src/routes/crm.routes.ts", "backend/src/services/crm.service.ts"],
        apis: ["/api/v1/leads/:id/move"],
        interview: "Eu explicaria permissao, workspaceId e auditoria como parte critica de CRM.",
      },
    ],
    codeFiles: [
      {
        path: "src/lib/api.ts",
        purpose: "Cliente HTTP do frontend.",
        parts: ["API_BASE_URL", "getAuth", "setAuth", "fetch com headers", "tratamento de 401"],
        beginner: "E o lugar que adiciona token antes de falar com o servidor.",
        interview: "Eu mostraria como o frontend carrega accessToken e workspaceId para manter contexto multi-tenant.",
      },
      {
        path: "backend/src/middleware/auth.ts",
        purpose: "Valida usuario, workspace e permissao.",
        parts: ["Bearer token", "x-workspace-id", "WorkspaceMember", "requirePermission"],
        beginner: "E o porteiro da API: verifica quem esta pedindo e se pode fazer aquilo.",
        interview: "Eu explicaria autorizacao por workspace, nao apenas autenticacao.",
      },
      {
        path: "backend/prisma/schema.prisma",
        purpose: "Modelo do banco.",
        parts: ["Usuarios", "Workspaces", "Leads", "Pipelines", "Inbox", "Webhooks", "Billing"],
        beginner: "E o mapa das tabelas do banco.",
        interview: "Eu destacaria a modelagem SaaS e relacoes entre CRM e mensagens.",
      },
    ],
    libraries: [
      { left: "express", middle: "API", right: "Rotas REST." },
      { left: "@prisma/client", middle: "Banco", right: "ORM para Postgres." },
      { left: "zod", middle: "Validacao", right: "Schemas de payload." },
      { left: "@tanstack/react-router", middle: "Frontend", right: "Rotas." },
      { left: "recharts", middle: "Relatorios", right: "Graficos." },
    ],
    security: ["Auth middleware verifica token e workspace.", "Permissoes por role para leads/contacts/settings.", "OAuth usa state cookie.", "AuditLog registra eventos."],
    errors: ["api.ts remove auth em 401.", "Backend usa next(error) e helpers ok/created.", "Reset/forgot aparecem como endpoints preparados."],
    performance: ["Queries Prisma usam paginacao em alguns endpoints.", "Reports usam agregacoes.", "Pode evoluir com indexes e cache por workspace."],
    ux: ["Rotas organizadas por modulos do CRM.", "Tema persiste localStorage.", "Dashboard e relatorios tornam operacao escaneavel."],
    pending: ["Confirmar producao com DATABASE_URL e OAuth ativos.", "A IA de resumo em /ai/summarize-conversation aparece como endpoint placeholder/honesto se nao conectado."],
    interview: commonInterview("Verdant CRM"),
    checklist: defaultChecklist,
  },
  {
    id: "oli",
    name: "Oli Drive Rent",
    url: "https://www.olilocacao.com.br",
    repoPath: "C:\\Users\\feema\\oli-drive-rent-review",
    status: "documented",
    oneLine: "Plataforma de locacao de veiculos com Supabase, chat realtime, contratos, pagamentos e vistorias.",
    problem: "Digitalizar locacao de veiculos: cadastro, busca, reserva, contrato, pagamento, chat e validacao de documentos.",
    audience: "Locadoras, motoristas e clientes que precisam gerenciar aluguel com rastreabilidade.",
    value: "Mostra fluxo operacional completo com Supabase, storage, realtime, edge function proxy e componentes ricos de pagamento/contrato.",
    mainFlow: "Usuario cria conta, busca veiculo, inicia reserva, assina contrato, paga caucoes/parcelas e conversa com locador pelo chat.",
    technicalDiff: "Uso intenso de Supabase realtime/storage/functions para uma aplicacao operacional sem backend Node proprio no workspace analisado.",
    interview30: "Oli Drive Rent e um app de locacao de veiculos em React/Vite com Supabase. Ele usa tabelas oli_*, realtime para chat/status, storage para fotos e CNH, e proxy webhook para integracoes como pagamentos e contratos.",
    technicalSummary: "O frontend usa React Router, Supabase client, hooks de realtime e componentes para chat, contratos, pagamentos Pix/cartao/deposito, perfil e veiculos. O banco aparece tipado em integrations/supabase/types.ts e acessado por tabelas oli_*.",
    beginnerSummary: "E como um app para alugar carro: voce ve veiculos, conversa, envia documentos, assina contrato e faz pagamento. O Supabase guarda tudo.",
    stack: [
      { left: "Frontend", middle: "React + Vite + TypeScript", right: "src", note: "SPA." },
      { left: "Rotas", middle: "react-router-dom", right: "layout e paginas", note: "Navegacao web." },
      { left: "Banco/Auth/Realtime", middle: "Supabase", right: "oli_* tables, auth, channels", note: "Dados principais." },
      { left: "Storage", middle: "Supabase Storage", right: "vehicle-photos, driver-licenses, chat-images", note: "Arquivos." },
      { left: "Pagamentos", middle: "Asaas/webhook proxy", right: "payment modals", note: "Integracao via function proxy." },
      { left: "PDF/QR", middle: "jsPDF + QRCode", right: "package.json/componentes", note: "Contratos e pagamentos." },
    ],
    folders: [
      { left: "src/components/chat", middle: "Chat realtime", right: "Conversas, mensagens, imagens e presenca." },
      { left: "src/components/contracts", middle: "Contratos e assinatura", right: "Visualizacao, assinatura e webhook." },
      { left: "src/components/payments", middle: "Pix, cartao, deposito", right: "Criacao e atualizacao de pagamentos." },
      { left: "src/components/vehicles", middle: "Cards e fotos", right: "Veiculos e storage." },
      { left: "src/lib", middle: "Services", right: "Chat, contratos, endereco, Supabase helpers." },
      { left: "supabase", middle: "Migrations/functions quando presentes", right: "Banco e edge functions." },
    ],
    pages: [
      { left: "/home", middle: "React Router", right: "Home publica/descoberta." },
      { left: "Reservas", middle: "components/reservations", right: "Cards do locador/locatario." },
      { left: "Chat", middle: "components/chat", right: "Conversas realtime." },
      { left: "Perfil", middle: "components/profile", right: "CNH, assinatura e verificacao facial." },
      { left: "Veiculos", middle: "components/vehicles", right: "Cards, fotos e galeria." },
    ],
    components: [
      { left: "ChatConversationView", middle: "src/components/chat/ChatConversationView.tsx", right: "Mensagens, presence e realtime." },
      { left: "ContractViewModal", middle: "src/components/contracts/ContractViewModal.tsx", right: "Contrato e webhook proxy." },
      { left: "PixPaymentModal", middle: "src/components/payments/PixPaymentModal.tsx", right: "Pagamento Pix com QR/codigo." },
      { left: "FaceRecognitionField", middle: "src/components/profile/FaceRecognitionField.tsx", right: "Captura imagem e envia para storage/webhook." },
    ],
    endpoints: [
      { left: "Supabase RPC oli_create_direct_conversation", middle: "RPC", right: "Criacao de conversa direta." },
      { left: "webhook-proxy", middle: "Supabase Function", right: "Proxy para contratos/pagamentos sem CORS." },
      { left: "ViaCEP", middle: "GET", right: "Busca endereco por CEP." },
      { left: "Supabase Storage", middle: "upload/getPublicUrl", right: "Fotos, CNH, imagens de chat." },
    ],
    database: [
      { left: "oli_profiles", middle: "Perfil", right: "Dados do usuario, CNH e verificacao." },
      { left: "oli_vehicles", middle: "Veiculos", right: "Catalogo de carros." },
      { left: "oli_vehicle_photos", middle: "Fotos", right: "Galeria por veiculo." },
      { left: "oli_rentals", middle: "Reservas/locacoes", right: "Fluxo contratual." },
      { left: "oli_payments", middle: "Pagamentos", right: "Pix/cartao/deposito e status." },
      { left: "oli_conversations/oli_messages", middle: "Chat", right: "Mensagens e participantes." },
      { left: "oli_inspections", middle: "Vistoria", right: "Estado de inspecao." },
    ],
    integrations: [
      { left: "Supabase", middle: "Auth, DB, Realtime, Storage, Functions", right: "Core do app." },
      { left: "Asaas", middle: "Pagamentos", right: "Chamado via webhook-proxy." },
      { left: "ViaCEP", middle: "Endereco", right: "Busca CEP." },
      { left: "Webhooks de contrato", middle: "webhook-proxy", right: "Integracao externa." },
    ],
    env: [
      { left: "Supabase URL/key", middle: "Cliente", right: "No codigo analisado ha valores publicos hardcoded; ideal migrar para env." },
      { left: "Webhook URLs", middle: "Integracoes", right: "Devem ficar em Edge Function/env, nao no cliente." },
    ],
    flows: [
      {
        name: "Chat realtime",
        goal: "Permitir conversa entre participantes da locacao.",
        steps: ["Carrega usuario", "Busca participantes/conversa", "Inscreve canal Supabase", "Envia mensagem para oli_messages", "Realtime atualiza UI"],
        files: ["src/components/chat/ChatConversationView.tsx", "src/lib/chatService.ts"],
        apis: ["Supabase realtime", "oli_messages", "oli_conversations"],
        interview: "Eu destacaria que realtime reduz polling e deixa conversa mais proxima de chat real.",
      },
      {
        name: "Pagamento Pix",
        goal: "Gerar cobranca e registrar pagamento.",
        steps: ["Usuario escolhe Pix", "Frontend chama webhook-proxy", "Recebe QR/codigo", "Atualiza oli_payments", "Hooks realtime acompanham status"],
        files: ["src/components/payments/PixPaymentModal.tsx", "src/hooks/usePaymentRealtime.ts"],
        apis: ["webhook-proxy", "oli_payments"],
        interview: "Eu explicaria a funcao proxy como camada para esconder API externa e evitar CORS.",
      },
    ],
    codeFiles: [
      {
        path: "src/lib/chatService.ts",
        purpose: "Servicos de conversa, mensagens e participantes.",
        parts: ["RPC create conversation", "Busca user", "Busca profiles/vehicles", "Insert messages", "Mark read"],
        beginner: "E o arquivo que salva e carrega mensagens do chat.",
        interview: "Eu mostraria como ele separa regra de chat dos componentes visuais.",
      },
      {
        path: "src/components/payments/PixPaymentModal.tsx",
        purpose: "Fluxo visual e tecnico de pagamento Pix.",
        parts: ["Busca usuario/perfil", "Chama webhook proxy", "Renderiza QR", "Atualiza oli_payments", "Estados de erro/loading"],
        beginner: "E a tela que gera o QR Code para pagar.",
        interview: "Eu explicaria a integracao de pagamento sem expor chave no frontend.",
      },
    ],
    libraries: [
      { left: "@supabase/supabase-js", middle: "Core", right: "Auth, DB, realtime e storage." },
      { left: "react-router-dom", middle: "Rotas", right: "Navegacao." },
      { left: "jspdf", middle: "PDF", right: "Contratos/documentos." },
      { left: "qrcode", middle: "Pix", right: "QR Code." },
      { left: "recharts", middle: "Graficos", right: "Dashboards." },
    ],
    security: ["Arquivos sensiveis como CNH devem ter politicas de storage corretas.", "Webhook proxy evita expor segredo de pagamento.", "Valores publicos hardcoded devem ser revisados e migrados para env quando aplicavel.", "RLS em tabelas oli_* e essencial."],
    errors: ["Componentes de pagamento capturam erro de webhook.", "Chat remove canais no cleanup.", "Debug panel contem console.log e deve ser restrito a preview/dev."],
    performance: ["Realtime evita polling.", "Storage guarda midia fora do bundle.", "Pode melhorar lazy loading de imagens e paginacao de chat."],
    ux: ["Fluxos ricos com modais.", "QR Pix e contrato tem feedback visual.", "Chat mostra presenca/typing."],
    pending: ["Confirmar politicas RLS e buckets em Supabase.", "Confirmar endpoint webhook-proxy e integracao Asaas em producao."],
    interview: commonInterview("Oli Drive Rent"),
    checklist: defaultChecklist,
  },
  {
    id: "crm-total-tour",
    name: "CRM Total Tour",
    url: "Conteudo pendente: link publico nao encontrado no workspace.",
    repoPath: "Conteudo pendente: codigo-fonte nao encontrado neste workspace.",
    status: "pending",
    oneLine: "Automacao comercial citada no portfolio, mas sem repositorio de codigo fonte localizado no workspace atual.",
    problem: "Automatizar funil comercial, leads, contexto de conversas e apoio de IA.",
    audience: "Equipe comercial/atendimento.",
    value: "Foi citado no portfolio como fluxo Kommo + n8n + Redis + IA, mas esta documentacao nao confirma codigo local.",
    mainFlow: "Conteudo pendente de validacao manual.",
    technicalDiff: "Conteudo pendente de validacao manual.",
    interview30: "Eu so apresentaria este projeto com cautela: existe descricao no portfolio, mas o codigo-fonte nao foi encontrado neste workspace durante esta analise.",
    technicalSummary: "Nao foi possivel confirmar stack, APIs, banco ou arquitetura por codigo local.",
    beginnerSummary: "Este capitulo e um marcador para completar depois com o repositorio correto.",
    stack: [{ left: "Status", middle: "Pendente", right: "Codigo-fonte nao encontrado no workspace." }],
    folders: [{ left: "Pendente", middle: "Sem caminho confirmado", right: "Adicionar quando o repositorio for localizado." }],
    pages: [],
    components: [],
    endpoints: [],
    database: [],
    integrations: [{ left: "Portfolio cita", middle: "Kommo, n8n, Redis, IA", right: "Nao confirmado por codigo local." }],
    env: [],
    flows: [],
    codeFiles: [],
    libraries: [],
    security: ["Nao documentar detalhes sensiveis sem codigo e sem sanitizacao."],
    errors: ["Nao afirmar funcionalidade sem repositorio."],
    performance: ["Pendente."],
    ux: ["Pendente."],
    pending: ["Localizar repositorio oficial.", "Validar workflows n8n e contratos.", "Adicionar APIs reais e fluxos testados."],
    interview: commonInterview("CRM Total Tour"),
    checklist: defaultChecklist,
  },
];

export const glossary = [
  { term: "Frontend", simple: "A parte visual que o usuario usa.", technical: "Camada client-side responsavel por renderizar UI, estado e chamadas de API.", example: "React/Vite em FelpaMusic, Vitrinno, Helena, Billie, Verdant e OLI." },
  { term: "Backend", simple: "O servidor que processa pedidos e protege regras.", technical: "Camada server-side com endpoints, validacao, autenticacao, banco e integracoes.", example: "FastAPI em Billie local, Express em Verdant, serverless APIs em Helena/Vitrinno." },
  { term: "API", simple: "Um endereco que a tela chama para pedir ou salvar dados.", technical: "Contrato HTTP com endpoint, metodo, payload e resposta.", example: "/api/v1/feed no Vitrinno e /api/app/health no Helena." },
  { term: "Endpoint", simple: "Uma rota especifica da API.", technical: "URL + metodo HTTP que executa uma funcao no backend.", example: "POST /api/helena/jobs/module2 cria job no Helena." },
  { term: "Payload", simple: "Os dados enviados para a API.", technical: "Corpo da requisicao, normalmente JSON ou FormData.", example: "Prompt de geracao no Studio ou arquivo audio em upload." },
  { term: "Autenticacao", simple: "Provar quem e o usuario.", technical: "Processo de login, emissao/validacao de token, cookie ou sessao.", example: "Supabase Auth no Billie e Helena." },
  { term: "Autorizacao", simple: "Verificar se o usuario pode fazer aquilo.", technical: "Checagem de permissoes por role, workspace, dono do recurso ou RLS.", example: "requirePermission em Verdant CRM." },
  { term: "Token", simple: "Uma credencial digital temporaria.", technical: "String assinada usada para autenticar chamadas, como JWT ou access token.", example: "Bearer token enviado pelo Verdant API client." },
  { term: "Cookie", simple: "Pequeno dado guardado pelo navegador.", technical: "Persistencia HTTP que pode ser HttpOnly/SameSite/Secure.", example: "helena_session no backend Helena." },
  { term: "Webhook", simple: "Um aviso enviado automaticamente para outro sistema.", technical: "Endpoint chamado por evento externo ou pelo app para acionar automacao.", example: "n8n no FelpaMusic e Helena." },
  { term: "Storage", simple: "Lugar para guardar arquivos.", technical: "Servico de objetos para audio, imagens, documentos e artefatos.", example: "Supabase Storage no OLI e Vitrinno." },
  { term: "Edge Function", simple: "Uma funcao pequena hospedada perto do usuario.", technical: "Funcao serverless do Supabase para logica segura e integracoes.", example: "proxy-media-url no FelpaMusic e chat no Billie." },
  { term: "Deploy", simple: "Colocar o site no ar.", technical: "Processo de build, upload e publicacao em plataforma como Vercel.", example: "Portfolio e apps publicados nos dominios felpamusic.com.br." },
  { term: "Build", simple: "Gerar a versao pronta para publicar.", technical: "Compilacao/empacotamento de TS/React/CSS/assets.", example: "pnpm run build no portfolio." },
  { term: "Roteamento", simple: "Definir qual tela abre em cada URL.", technical: "Mapeamento de paths para componentes/paginas.", example: "TanStack Router no Vitrinno, Billie, Helena e Verdant." },
  { term: "Estado", simple: "Memoria atual da tela.", technical: "Dados mantidos por hooks, stores, cache ou localStorage.", example: "Viewport e snapshots no Billie Studio." },
  { term: "Hook", simple: "Funcao React para reutilizar comportamento.", technical: "Abstracao de estado/efeito/contexto em componentes React.", example: "useAuth no Billie e hooks realtime no OLI." },
  { term: "ORM", simple: "Ferramenta para falar com banco usando codigo.", technical: "Mapeia tabelas para models e queries tipadas.", example: "Prisma no Verdant CRM." },
  { term: "CORS", simple: "Regra que permite ou bloqueia chamadas entre sites.", technical: "Politica de browser baseada em origem e headers.", example: "proxy-media-url evita CORS no FelpaMusic." },
  { term: "Streaming", simple: "Receber resposta aos poucos.", technical: "Fluxo incremental de dados via SSE/stream reader.", example: "Chat do Billie Brain." },
  { term: "Realtime", simple: "Atualizar sem recarregar a pagina.", technical: "Subscricao em eventos de banco/canal.", example: "Chat e pagamentos no OLI." },
];

export const portfolioSources = [
  "C:\\Users\\feema\\felpamusic\\package.json e src/components",
  "C:\\Users\\feema\\billie-joe\\package.json, apps/web e apps/api",
  "C:\\Users\\feema\\vitrinno\\package.json, src/routes e src/lib/vitrinno-api.ts",
  "C:\\Users\\feema\\helena-video\\src e api",
  "C:\\Users\\feema\\CRM-Verdant\\src, backend/src e backend/prisma",
  "C:\\Users\\feema\\oli-drive-rent-review\\src e supabase",
  "C:\\Users\\feema\\portfolio-felipe-prates\\src/routes/index.tsx",
];
