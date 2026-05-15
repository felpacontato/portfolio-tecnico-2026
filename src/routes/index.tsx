import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import CircularGallery from "@/components/ui/CircularGallery";
import PortfolioIntro from "@/components/PortfolioIntro";

const GALLERY_ITEMS = [
  {
    image: "/assets/cards/cover-felpamusic.png",
    text: "FelpaMusic",
    href: "https://www.felpamusic.com.br",
    description: "Plataforma de música com IA aplicada à criação, organização e descoberta de conteúdo.",
    tag: "PLATAFORMA + IA",
  },
  {
    image: "/assets/cards/cover-vitrinno.png",
    text: "Vitrinno",
    href: "https://www.vitrinno.felpamusic.com.br",
    description: "Rede social musical com feed, catálogo, perfis, player, mensagens, uploads e studio para artistas.",
    tag: "SOCIAL MUSIC",
  },
  {
    image: "/assets/cards/cover-helena.jpeg",
    text: "Helena Vídeo",
    href: "https://www.helena-video.felpamusic.com.br",
    description: "Studio de vídeo com IA para briefing, módulos criativos, timeline, assets e publicação.",
    tag: "VÍDEO + IA",
  },
  {
    image: "/assets/cards/cover-billie.png",
    text: "Billie Brain",
    href: "https://www.billie-brain.felpamusic.com.br",
    description: "Assistente de engenharia com chat, Studio visual, wallet, billing, usage e integrações.",
    tag: "AI DEV TOOL",
  },
  {
    image: "/assets/cards/cover-verdant.png",
    text: "Verdant CRM",
    href: "https://www.verdant-crm.felpamusic.com.br",
    description: "CRM SaaS com área protegida, pipeline comercial, autenticação e base operacional.",
    tag: "CRM + SAAS",
  },
  {
    image: "/assets/cards/cover-oli.png",
    text: "OLI Locações",
    href: "https://www.olilocacao.com.br",
    description: "Sistema de gestão para locações com automações operacionais e controle completo de contratos.",
    tag: "GESTÃO + AUTOMAÇÃO",
  },
  {
    image: "/assets/cards/cover-crm.png",
    text: "CRM Total Tour",
    href: "#crm",
    description: "CRM completo para gestão de leads, funis, automação e inteligência comercial.",
    tag: "CRM + AUTOMAÇÃO",
  },
];

const BODY_HTML = `
    <a class="skip-link" href="#projetos">Pular para projetos</a>

    <header class="site-header" data-header>
      <a class="brand" href="#top" aria-label="Felipe Prates portfolio">
        <span class="brand-mark"><img src="/assets/logo-felipe.png" alt="Logo Felipe Prates" /></span>
        <span>Felipe Prates</span>
      </a>
      <nav class="nav-links" aria-label="Navegação principal">
        <a href="#felpamusic">FelpaMusic</a>
        <a href="#vitrinno">Vitrinno</a>
        <a href="#helena">Helena</a>
        <a href="#billie-brain">Billie Brain</a>
        <a href="#verdant">Verdant</a>
        <a href="#oli">OLI</a>
        <a href="#crm">CRM</a>
        <a href="#blog">Blog</a>
      </nav>
      <a class="header-cta" href="mailto:felpacontato@gmail.com"><span>Contato</span><span aria-hidden="true">↗</span></a>
    </header>

    <main id="top">
      <section class="hero section-shell">
        <div class="hero-copy reveal">
          <p class="eyebrow">Full Stack Developer Júnior | IA aplicada | Automação</p>
          <h1>Desenvolvo<br><span class="text-accent">aplicações</span> completas<br>com frontend, backend,<br>dados, automações<br>e IA prontas para<br>gerar resultados.</h1>
          <p class="hero-text">
            Sou Felipe Prates, desenvolvedor full stack júnior com experiência prática criando produtos reais do zero. Trabalho com React, TypeScript, Supabase, FastAPI, n8n, Docker e integrações de IA para transformar problemas abertos em sistemas utilizáveis, estáveis e fáceis de evoluir. Já conduzi projetos completos, da arquitetura ao deploy e operação, e busco uma oportunidade para aplicar esse know-how em um time técnico.
          </p>
          <div class="hero-actions" aria-label="Ações principais">
            <a class="button primary" href="#projetos">Ver projetos</a>
            <a class="button secondary" href="https://github.com/felpacontato" rel="noopener noreferrer" target="_blank">GitHub</a>
            <a class="button secondary" href="https://www.linkedin.com/in/felipe-prates-070985376/" rel="noopener noreferrer" target="_blank">LinkedIn</a>
          </div>
          <div class="signal-row" aria-label="Destaques">
            <span>Produtos 0-1</span>
            <span>APIs, Supabase e n8n</span>
            <span>VPS, Docker e Vercel</span>
          </div>
        </div>

        <div class="hero-visual reveal">
          <div class="profile-panel">
            <div class="profile-photo-wrap">
              <div class="profile-matrix" aria-hidden="true">
                <span>アカサタナハマヤラワ0123456789</span><span>0101011100101010010110</span><span>FULLSTACKREACTTYPESCRIPT</span><span>1011001010110100101101</span><span>バックエンドオートメーション</span><span>APIデータAI0101101101</span><span>SUPABASEFASTAPIN8N</span><span>01101001010110100101</span><span>デプロイコードクラウド</span><span>1001011011010010110</span><span>IAAUTOMACAODADOS</span><span>010011010110101101</span>
              </div>
              <img src="/assets/profile/felipe-transparent.png" alt="Felipe Prates" class="profile-photo">
            </div>
            <div>
              <p class="panel-kicker">Portfolio técnico</p>
              <h2>Full Stack Developer</h2>
              <p>Produto, backend, automação, IA aplicada e operação.</p>
            </div>
          </div>
          <div class="terminal-panel hero-capability-panel cap-grid" aria-label="Resumo tecnico">
            <div class="hero-capability cap-card"><div class="cap-img" style="background-image:url('/assets/cards/cap-dev.jpg')"></div><div class="cap-body"><strong>&lt;/&gt;</strong><span>Desenvolvimento</span><small>Frontend &amp; Backend</small></div></div>
            <div class="hero-capability cap-card"><div class="cap-img" style="background-image:url('/assets/cards/cap-db.jpg')"></div><div class="cap-body"><strong>DB</strong><span>Dados</span><small>Modelagem &amp; SQL</small></div></div>
            <div class="hero-capability cap-card"><div class="cap-img" style="background-image:url('/assets/cards/cap-aut.jpg')"></div><div class="cap-body"><strong>AUT</strong><span>Automações</span><small>Workflows &amp; Integrações</small></div></div>
            <div class="hero-capability cap-card"><div class="cap-img" style="background-image:url('/assets/cards/cap-ia.jpg')"></div><div class="cap-body"><strong>IA</strong><span>IA Aplicada</span><small>LLMs &amp; Agentes</small></div></div>
          </div>
        </div>
        <div class="hero-scroll-cue" aria-hidden="true">
          <span>ROLE PARA EXPLORAR</span>
          <strong>↓</strong>
        </div>
      </section>

      <section class="section-shell intro-grid" aria-labelledby="direcao-title">
        <div class="section-heading reveal">
          <h2 id="direcao-title">Projetos reais, decisões técnicas e entrega ponta a ponta.</h2>
          <p class="section-intro">Este portfólio apresenta projetos reais, não apenas uma lista de tecnologias. Cada estudo de caso mostra o problema, meu papel, as decisões técnicas, a arquitetura e os resultados, sem expor dados sensíveis ou depender apenas de telas bonitas.</p>
        </div>
        <div class="principle-carousel reveal">
          <article class="principle principle-v2">
            <div class="principle-cover" style="background-image:url('/assets/cards/principle-contexto.jpg')"></div>
            <div class="principle-body">
              <strong>Contexto</strong>
              <p>Qual problema o produto resolve, quais usuários atende e quais fluxos precisam funcionar sem improviso.</p>
            </div>
          </article>
          <article class="principle principle-v2">
            <div class="principle-cover" style="background-image:url('/assets/cards/principle-arquitetura.jpg')"></div>
            <div class="principle-body">
              <strong>Arquitetura</strong>
              <p>Como front-end, API, banco, automações, agentes e infraestrutura foram organizados para reduzir fragilidade.</p>
            </div>
          </article>
          <article class="principle principle-v2">
            <div class="principle-cover" style="background-image:url('/assets/cards/principle-entrega.jpg')"></div>
            <div class="principle-body">
              <strong>Entrega</strong>
              <p>O que foi implementado, quais decisões técnicas importaram e como a solução foi validada sem expor dados sensíveis.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="projetos" class="section-shell projects-index" aria-labelledby="projects-title">
        <div class="section-heading reveal">
          <p class="eyebrow">Portfólio de produtos</p>
          <h2 id="projects-title">Sete produtos que demonstram execução full stack, IA aplicada e automação na prática.</h2>
          <p class="section-intro">Cada projeto nasceu de um problema real, foi pensado de ponta a ponta e entregue com foco em performance, experiência e resultado. Do código à automação, do banco à interface, tudo desenvolvido com precisão e propósito.</p>
        </div>
        <div id="projects-circular-gallery" class="reveal" style="height:640px;position:relative;width:100%;margin-top:32px">
          <div class="index-list project-card-grid gallery-fallback" aria-label="Lista de projetos">
            <a class="pcard" href="https://www.felpamusic.com.br" target="_blank" rel="noopener noreferrer" style="background-image:url('/assets/cards/cover-felpamusic.png')"><span class="pcard-num">01</span><span class="pcard-overlay"><strong>FelpaMusic</strong><small>Áudio, IA e automação</small></span></a>
            <a class="pcard" href="https://www.vitrinno.felpamusic.com.br" target="_blank" rel="noopener noreferrer" style="background-image:url('/assets/cards/cover-vitrinno.png')"><span class="pcard-num">02</span><span class="pcard-overlay"><strong>Vitrinno</strong><small>Rede social musical</small></span></a>
            <a class="pcard" href="https://www.helena-video.felpamusic.com.br" target="_blank" rel="noopener noreferrer" style="background-image:url('/assets/cards/cover-helena.jpeg')"><span class="pcard-num">03</span><span class="pcard-overlay"><strong>Helena Video</strong><small>Studio de vídeo IA</small></span></a>
            <a class="pcard" href="https://www.billie-brain.felpamusic.com.br" target="_blank" rel="noopener noreferrer" style="background-image:url('/assets/cards/cover-billie.png')"><span class="pcard-num">04</span><span class="pcard-overlay"><strong>Billie Brain</strong><small>AI dev tool</small></span></a>
            <a class="pcard" href="https://www.verdant-crm.felpamusic.com.br" target="_blank" rel="noopener noreferrer" style="background-image:url('/assets/cards/cover-verdant.png')"><span class="pcard-num">05</span><span class="pcard-overlay"><strong>Verdant CRM</strong><small>CRM SaaS protegido</small></span></a>
            <a class="pcard" href="https://www.olilocacao.com.br" target="_blank" rel="noopener noreferrer" style="background-image:url('/assets/cards/cover-oli.png')"><span class="pcard-num">06</span><span class="pcard-overlay"><strong>OLI Locações</strong><small>Locação e operação</small></span></a>
            <a class="pcard" href="#crm" style="background-image:url('/assets/cards/cover-crm.png')"><span class="pcard-num">07</span><span class="pcard-overlay"><strong>CRM Total Tour</strong><small>Automação comercial</small></span></a>
          </div>
        </div>
      </section>

      <section class="image-slider reveal" aria-label="Galeria visual">
        <div class="slider-track" data-auto-slider>
          <div class="slider-item"><img src="/assets/cards/slider-1.jpg" alt="Visual abstrato de tecnologia verde"></div>
          <div class="slider-item"><img src="/assets/cards/slider-2.jpg" alt="Visual de circuito digital em verde"></div>
          <div class="slider-item"><img src="/assets/cards/slider-3.jpg" alt="Visual abstrato de onda digital"></div>
          <div class="slider-item"><img src="/assets/cards/slider-4.jpg" alt="Visual de interface técnica"></div>
          <div class="slider-item"><img src="/assets/cards/slider-5.jpg" alt="Visual abstrato de dados e automação"></div>
        </div>
      </section>

      <article id="felpamusic" class="project-section feature-project">
        <div class="section-shell project-layout">
          <div class="project-copy reveal">
            <p class="project-number">01 / FelpaMusic</p>
            <h2>Plataforma musical com IA para criação, edição e processamento de áudio.</h2>
            <p class="project-lead">
              FelpaMusic é meu projeto mais completo: uma plataforma para criação musical, mixagem e masterização, separação de stems e entrega de áudio com IA. Estruturei a arquitetura full stack combinando interface web, Supabase, APIs FastAPI, n8n, serviços em contêiner e agentes especializados para sustentar pipelines de áudio longos e assíncronos em produção.
            </p>
            <div class="proof-grid" aria-label="Resumo executivo FelpaMusic">
              <div><span>Papel</span><p>Arquitetura, front-end, integrações, APIs, n8n, validação de contratos e operação.</p></div>
              <div><span>Decisão técnica</span><p>Separar V1, V2 e God Mode para preservar compatibilidade enquanto evolui a qualidade.</p></div>
              <div><span>Resultado</span><p>Ecossistema modular de áudio capaz de processar tracks de ponta a ponta e evoluir qualidade sem quebrar fluxos existentes.</p></div>
            </div>

            <div class="detail-block">
              <h3>Escopo do produto</h3>
              <ul class="check-list">
                <li><strong>Mix &amp; Master (V1, V2 e God Mode):</strong> pipelines de processamento de áudio com diferentes contratos de stems e níveis de qualidade.</li>
                <li><strong>Ferramentas de pós-processamento:</strong> Stem Splitters, Magic Volumes e FelpaTune para separação de stems, organização de volumes e afinação vocal.</li>
                <li><strong>Editor:</strong> timeline com biblioteca de stems, ferramentas de corte e continuidade da sessão do usuário.</li>
                <li><strong>Creator e Lunna:</strong> fluxo de criação musical assíncrona com geração de versões, seleção de saídas e publicação de artefatos. <strong>Lunna</strong> orquestra o pedido, interpreta a intenção e conduz as etapas do processo.</li>
              </ul>
            </div>

            <div class="detail-block">
              <h3>Arquitetura de agentes</h3>
              <p>
                A camada de IA funciona como um sistema de decisão: intake de requisições, normalização, análise de referências, separação de stems, ajuste de parâmetros, mix/master QA e curadoria de variantes A/B. O desafio foi manter contratos estáveis entre front-end, n8n, Supabase e APIs para evitar regressões em jornadas assíncronas.
              </p>
            </div>

            <div class="stack-groups">
              <div>
                <span>Frontend</span>
                <p>React, TypeScript, Vite, Tailwind/shadcn, rotas de produto e player.</p>
              </div>
              <div>
                <span>Backend/APIs</span>
                <p>Python, FastAPI, jobs assíncronos, endpoints REST e serviços de áudio.</p>
              </div>
              <div>
                <span>Dados</span>
                <p>Supabase, PostgreSQL, storage, sessão, filas lógicas e artefatos.</p>
              </div>
              <div>
                <span>Operação</span>
                <p>Linux VPS, Docker, REAPER/FFmpeg, health checks, logs e validação de produção.</p>
              </div>
              <div>
                <span>Link real</span>
                <p><a href="https://www.felpamusic.com.br" target="_blank" rel="noopener noreferrer">www.felpamusic.com.br</a></p>
              </div>
            </div>
          </div>

          <div class="project-media reveal">
            <img class="media-main" src="/assets/portfolio/felpamusic/screen-01.png" alt="Tela principal do FelpaMusic">
            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/felpamusic/screen-03.png" aria-label="Abrir print de projetos FelpaMusic">
                <img src="/assets/portfolio/felpamusic/screen-03.png" alt="Tela de projetos do FelpaMusic">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/felpamusic/screen-11.png" aria-label="Abrir banco de prompts FelpaMusic">
                <img src="/assets/portfolio/felpamusic/screen-11.png" alt="Banco de prompts do FelpaMusic">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/felpamusic/screen-15.png" aria-label="Abrir editor FelpaMusic">
                <img src="/assets/portfolio/felpamusic/screen-15.png" alt="Editor do FelpaMusic">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/felpamusic/screen-16.png" aria-label="Abrir StemSplitter Pro">
                <img src="/assets/portfolio/felpamusic/screen-16.png" alt="StemSplitter Pro no FelpaMusic">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/felpamusic/screen-17.png" aria-label="Abrir Magic Volumes">
                <img src="/assets/portfolio/felpamusic/screen-17.png" alt="Magic Volumes no FelpaMusic">
              </button>
            </div>
          </div>
        </div>
      </article>

      <article id="vitrinno" class="project-section">
        <div class="section-shell project-layout reverse">
          <div class="project-media reveal">
            <img class="media-main" src="/assets/portfolio/vitrinno/screen-01.png" alt="Home do Vitrinno">
            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-03.png" aria-label="Abrir feed do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-03.png" alt="Feed do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-05.png" aria-label="Abrir player do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-05.png" alt="Player do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-08.png" aria-label="Abrir catalogo do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-08.png" alt="Catálogo do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-12.png" aria-label="Abrir analytics do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-12.png" alt="Analytics do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-15.png" aria-label="Abrir configuracoes do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-15.png" alt="Configurações do Vitrinno">
              </button>
            </div>
          </div>
          <div class="project-copy reveal">
            <p class="project-number">02 / Vitrinno</p>
            <h2>Rede social musical com catálogo, studio e monetização para artistas.</h2>
            <p class="project-lead">
              Vitrinno é um MVP full stack para artistas publicarem e monetizarem seu catálogo musical. Estruturei autenticação, perfis, feed, mensagens, uploads, catálogo, checkout e automações de publicação multicanal, criando a base de um SaaS social para músicos.
            </p>
            <div class="proof-grid" aria-label="Resumo executivo Vitrinno">
              <div><span>Papel</span><p>Construção do MVP full stack, modelagem de dados, rotas de produto e fluxos de autenticação.</p></div>
              <div><span>Decisão técnica</span><p>Usar Next.js App Router e Prisma para acelerar produto sem abrir mão de estrutura de backend.</p></div>
              <div><span>Resultado</span><p>Uma base de produto social preparada para evoluir como SaaS musical, com estrutura de dados, rotas principais e integrações comerciais já definidas.</p></div>
            </div>
            <div class="detail-block">
              <h3>Entregas principais</h3>
              <ul class="check-list">
                <li><strong>Rede social:</strong> posts, perfis, follow/unfollow e mensagens em tempo real.</li>
                <li><strong>Catálogo e monetização:</strong> uploads via storage S3-compatible, catálogo de faixas, compra e checkout com Stripe.</li>
                <li><strong>Integrações externas:</strong> publicação multicanal via n8n webhooks e OAuth social.</li>
              </ul>
            </div>
            <div class="stack-groups">
              <div><span>Framework</span><p>Next.js 16, React 19, TypeScript e Tailwind CSS v4.</p></div>
              <div><span>Backend &amp; Banco</span><p>Prisma/PostgreSQL com suporte a Supabase, autenticação via JWT e cookies.</p></div>
              <div><span>Integrações</span><p>Stripe para checkout, S3-compatible storage para uploads, OAuth social e n8n webhooks.</p></div>
              <div><span>Produto</span><p>Rede social, studio, catálogo, mensagens e monetização.</p></div>
              <div><span>Link real</span><p><a href="https://www.vitrinno.felpamusic.com.br" target="_blank" rel="noopener noreferrer">www.vitrinno.felpamusic.com.br</a></p></div>
            </div>
          </div>
        </div>
      </article>

      <article id="helena" class="project-section">
        <div class="section-shell project-layout reverse">
          <div class="project-media reveal">
            <img class="media-main" src="/assets/portfolio/helena/screen-01.png" alt="Studio Helena Video">
            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/helena/screen-02.png" aria-label="Abrir legendas Helena Video">
                <img src="/assets/portfolio/helena/screen-02.png" alt="Legendas no Helena Video">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/helena/screen-05.png" aria-label="Abrir audio Helena Video">
                <img src="/assets/portfolio/helena/screen-05.png" alt="Áudio no Helena Video">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/helena/screen-07.png" aria-label="Abrir publicacao Helena Video">
                <img src="/assets/portfolio/helena/screen-07.png" alt="Publicação no Helena Video">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/helena/screen-09.png" aria-label="Abrir carteira Helena Video">
                <img src="/assets/portfolio/helena/screen-09.png" alt="Carteira do Helena Video">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/helena/screen-11.png" aria-label="Abrir planos Helena Video">
                <img src="/assets/portfolio/helena/screen-11.png" alt="Planos do Helena Video">
              </button>
            </div>
          </div>
          <div class="project-copy reveal">
            <p class="project-number">03 / Helena Video</p>
            <h2>Studio de vídeo com IA, timeline e pipeline de publicação.</h2>
            <p class="project-lead">
              Helena Video é um estúdio de vídeo com IA: concentra briefing, módulos criativos, timeline e publicação em uma plataforma independente. Defini a arquitetura de studio, contratos com provedores, banco de dados e validação QA, separando domínios para evoluir novos módulos sem quebrar a experiência.
            </p>
            <div class="proof-grid" aria-label="Resumo executivo Helena Video">
              <div><span>Papel</span><p>Estruturação do produto, UI de studio, contrato de provedores, Supabase e validação QA.</p></div>
              <div><span>Decisão técnica</span><p>Organizar o studio em módulos claros, briefing, geração, timeline, assets e publicação, para permitir novos provedores de vídeo sem redesenhar a experiência principal.</p></div>
              <div><span>Resultado</span><p>Base independente que permite evoluir geração de vídeo, assets, jobs, QA e publicação sem acoplar o produto a outros sistemas.</p></div>
            </div>
            <div class="detail-block">
              <h3>Módulos</h3>
              <ul class="check-list">
                <li><strong>Studio e Módulos:</strong> Transformar, Storyboard e AutoCut com prompt, referências, upload, modelo, qualidade, câmera, movimento, duração e exportação.</li>
                <li><strong>Timeline e Assets:</strong> organização de vídeo, áudio, legendas, efeitos e estados.</li>
                <li><strong>Chat Helena/LunnaHelena:</strong> assistente que converte intenção criativa em parâmetros operacionais.</li>
                <li><strong>Provedores externos:</strong> matriz para Helena Native, Kling, Wan, Seedance, Hailuo, Image Lab, Music/TTS e Publish Hub.</li>
                <li><strong>Dados e jobs:</strong> Supabase com schema para projetos, assets, jobs, mensagens e publicação.</li>
              </ul>
            </div>
            <div class="stack-groups">
              <div><span>Frontend</span><p>Vite, React 18, TypeScript e CSS próprio para uma interface de produção.</p></div>
              <div><span>Dados</span><p>Supabase, migrations e Edge Function proxy para separar segredos de frontend.</p></div>
              <div><span>Testes</span><p>Playwright QA, capturas desktop/mobile e validação de deploy.</p></div>
              <div><span>Arquitetura</span><p>Projeto isolado, domínio próprio e limites claros entre produtos.</p></div>
              <div><span>Link real</span><p><a href="https://www.helena-video.felpamusic.com.br" target="_blank" rel="noopener noreferrer">www.helena-video.felpamusic.com.br</a></p></div>
            </div>
          </div>
        </div>
      </article>

      <article id="billie-brain" class="project-section">
        <div class="section-shell project-layout">
          <div class="project-copy reveal">
            <p class="project-number">04 / Billie Brain</p>
            <h2>Assistente de engenharia com chat, Studio visual, uso, wallet e integrações.</h2>
            <p class="project-lead">
              Billie Brain é um produto de agente para desenvolvimento de software, com uma experiência pública, área autenticada, Codex Chat, Billie Studio, conectores, usage, wallet, billing e configurações de workspace. O foco foi transformar uma ideia de assistente técnico em uma interface de produto com fluxo real de conta, métricas e estados honestos para recursos que dependem de provedores externos.
            </p>
            <div class="proof-grid" aria-label="Resumo executivo Billie Brain">
              <div><span>Papel</span><p>Arquitetura de produto, UI, rotas, integração Supabase, chat, billing states, Studio e QA visual.</p></div>
              <div><span>Decisão técnica</span><p>Separar página pública, app autenticado e Studio visual para não misturar marketing, operação e preview/editor.</p></div>
              <div><span>Resultado</span><p>Base SaaS para um agente de engenharia, com telas de produto, fluxo protegido e integração preparada para Edge Functions, wallet e conectores.</p></div>
            </div>
            <div class="detail-block">
              <h3>Escopo implementado</h3>
              <ul class="check-list">
                <li><strong>Codex Chat:</strong> interface de conversas, composer, histórico e integração planejada com streaming/Edge Function.</li>
                <li><strong>Billie Studio:</strong> página de preview/editor visual no estilo Lovable, com URL carregável, referências, snapshots locais e viewports.</li>
                <li><strong>Conta e operação:</strong> dashboard, connectors, usage, wallet, billing, account e settings com estados de configuração externa claros.</li>
                <li><strong>Produto público:</strong> landing, pricing, about, changelog e documentos legais para apresentação e conversão.</li>
              </ul>
            </div>
            <div class="stack-groups">
              <div><span>Frontend</span><p>React, Vite/TanStack, TypeScript e UI responsiva orientada a developer tools.</p></div>
              <div><span>Dados/Auth</span><p>Supabase Auth, profiles, conversas, usage, wallet e settings.</p></div>
              <div><span>IA</span><p>Chat agente, roteamento de modelos, Edge Function e fallback honesto quando provider não está configurado.</p></div>
              <div><span>Link real</span><p><a href="https://www.billie-brain.felpamusic.com.br" target="_blank" rel="noopener noreferrer">www.billie-brain.felpamusic.com.br</a></p></div>
            </div>
          </div>
          <div class="project-media reveal">
            <img class="media-main" src="/assets/portfolio/billie-brain/screen-01.png" alt="Landing page do Billie Brain">
            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/billie-brain/screen-02.png" aria-label="Abrir Billie Studio">
                <img src="/assets/portfolio/billie-brain/screen-02.png" alt="Billie Studio visual">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/billie-brain/screen-03.png" aria-label="Abrir Codex Chat Billie Brain">
                <img src="/assets/portfolio/billie-brain/screen-03.png" alt="Codex Chat do Billie Brain">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/billie-brain/screen-04.png" aria-label="Abrir conectores Billie Brain">
                <img src="/assets/portfolio/billie-brain/screen-04.png" alt="Connectors do Billie Brain">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/billie-brain/screen-05.png" aria-label="Abrir wallet Billie Brain">
                <img src="/assets/portfolio/billie-brain/screen-05.png" alt="Wallet do Billie Brain">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/billie-brain/screen-06.png" aria-label="Abrir settings Billie Brain">
                <img src="/assets/portfolio/billie-brain/screen-06.png" alt="Settings do Billie Brain">
              </button>
            </div>
          </div>
        </div>
      </article>

      <article id="verdant" class="project-section">
        <div class="section-shell project-layout reverse">
          <div class="project-media reveal">
            <img class="media-main" src="/assets/portfolio/verdant/screen-01.png" alt="Login e acesso do Verdant CRM">
            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/verdant/screen-02.png" aria-label="Abrir dashboard protegido Verdant CRM">
                <img src="/assets/portfolio/verdant/screen-02.png" alt="Dashboard protegido do Verdant CRM redirecionando para login">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/verdant/screen-03.png" aria-label="Abrir leads protegidos Verdant CRM">
                <img src="/assets/portfolio/verdant/screen-03.png" alt="Área de leads protegida do Verdant CRM">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/verdant/screen-04.png" aria-label="Abrir versão mobile Verdant CRM">
                <img src="/assets/portfolio/verdant/screen-04.png" alt="Tela mobile do Verdant CRM">
              </button>
            </div>
          </div>
          <div class="project-copy reveal">
            <p class="project-number">05 / Verdant CRM</p>
            <h2>CRM SaaS protegido para pipeline comercial, leads e operação de atendimento.</h2>
            <p class="project-lead">
              Verdant CRM é uma aplicação SaaS de CRM com rotas protegidas, autenticação e base para gestão de pipeline, leads, dashboard e configurações. Na auditoria pública, as rotas internas redirecionam para login, então o portfolio mostra o produto de forma honesta: foco em arquitetura, autenticação, proteção de área interna e fluxo de acesso.
            </p>
            <div class="proof-grid" aria-label="Resumo executivo Verdant CRM">
              <div><span>Papel</span><p>Produto, front-end, autenticação, rotas protegidas, deploy e organização da base SaaS.</p></div>
              <div><span>Decisão técnica</span><p>Proteger dashboard, leads e operação atrás de login em vez de expor dados ou telas internas publicamente.</p></div>
              <div><span>Resultado</span><p>CRM publicado com domínio próprio, fluxo de acesso e estrutura preparada para evoluir pipeline e automações comerciais.</p></div>
            </div>
            <div class="detail-block">
              <h3>Escopo do produto</h3>
              <ul class="check-list">
                <li><strong>Autenticação:</strong> login como porta de entrada e redirecionamento seguro das áreas internas.</li>
                <li><strong>Pipeline e leads:</strong> estrutura de rotas para gestão comercial sem expor informação sensível fora da sessão.</li>
                <li><strong>Operação SaaS:</strong> base para dashboard, configurações, usuários e evolução de workflows comerciais.</li>
                <li><strong>Disponibilidade pública:</strong> domínio próprio verificado em HTTPS, com áreas privadas protegidas.</li>
              </ul>
            </div>
            <div class="stack-groups">
              <div><span>Frontend</span><p>React/TypeScript, UI de SaaS e rotas responsivas.</p></div>
              <div><span>Produto</span><p>Dashboard, leads, pipeline e configurações como módulos protegidos.</p></div>
              <div><span>Segurança</span><p>Rotas internas redirecionam para login quando não há sessão.</p></div>
              <div><span>Link real</span><p><a href="https://www.verdant-crm.felpamusic.com.br" target="_blank" rel="noopener noreferrer">www.verdant-crm.felpamusic.com.br</a></p></div>
            </div>
          </div>
        </div>
      </article>

      <article id="oli" class="project-section">
        <div class="section-shell project-layout">
          <div class="project-copy reveal">
            <p class="project-number">06 / OLI Locações</p>
            <h2>Marketplace de locação com fluxos para motorista, locador e operação.</h2>
            <p class="project-lead">
              OLI Locações organiza a jornada de aluguel de veículos entre motoristas, locadores e operação. Modelei os fluxos principais, integrei Supabase e n8n, implementei caução via Asaas e defini fronteiras entre web e app mobile para permitir evolução independente.
            </p>
            <div class="proof-grid" aria-label="Resumo executivo OLI Locações">
              <div><span>Papel</span><p>Análise de arquitetura, integração Supabase/n8n, fluxo de caução e direção mobile separada.</p></div>
              <div><span>Decisão técnica</span><p>Criar workflows isolados para pagamentos e callbacks, em vez de alterar fluxos ativos sem validação.</p></div>
              <div><span>Resultado</span><p>Jornadas mais claras, integrações mais seguras e uma base preparada para expansão mobile sem comprometer o produto web.</p></div>
            </div>
            <div class="detail-block">
              <h3>Jornadas e automações</h3>
              <ul class="check-list">
                <li><strong>Fluxos de reserva e perfis:</strong> busca, filtros, pré-reserva, reserva e áreas de usuário (perfil, veículos, mensagens e histórico).</li>
                <li><strong>Segurança e automações:</strong> Supabase + Edge Functions como gateway seguro; workflows n8n isolados para caução via Asaas, com criação da cobrança, callback de status e liberação manual.</li>
                <li><strong>Estratégia mobile:</strong> aplicação Expo/React Native separada do web para evoluir de forma independente.</li>
              </ul>
            </div>
            <div class="stack-groups">
              <div><span>Frontend/Mobile</span><p>React, Vite, Tailwind, shadcn e aplicação Expo/React Native separada do web.</p></div>
              <div><span>Backend &amp; Banco</span><p>Supabase, Edge Functions e webhook proxy.</p></div>
              <div><span>Automação/Pagamentos</span><p>n8n, Asaas, Serasa/DataValid, Clicksign, Serasa e callbacks de pagamento.</p></div>
              <div><span>Link real</span><p><a href="https://www.olilocacao.com.br" target="_blank" rel="noopener noreferrer">www.olilocacao.com.br</a></p></div>
            </div>
          </div>
          <div class="project-media reveal">
            <img class="media-main" src="/assets/portfolio/oli/screen-07.png" alt="Home do OLI Locações">
            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/oli/screen-02.png" aria-label="Abrir busca OLI">
                <img src="/assets/portfolio/oli/screen-02.png" alt="Busca de veículos no OLI">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/oli/screen-18.png" aria-label="Abrir reserva motorista OLI">
                <img src="/assets/portfolio/oli/screen-18.png" alt="Reserva motorista no OLI">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/oli/screen-17.png" aria-label="Abrir reserva locador OLI">
                <img src="/assets/portfolio/oli/screen-17.png" alt="Reserva locador no OLI">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/oli/screen-09.png" aria-label="Abrir veiculos OLI">
                <img src="/assets/portfolio/oli/screen-09.png" alt="Meus veículos no OLI">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/oli/screen-14.png" aria-label="Abrir perfil OLI">
                <img src="/assets/portfolio/oli/screen-14.png" alt="Perfil no OLI">
              </button>
            </div>
          </div>
        </div>
      </article>

      <article id="crm" class="project-section">
        <div class="section-shell project-layout">
          <div class="project-copy reveal">
            <p class="project-number">07 / CRM Total Tour</p>
            <h2>Automação comercial com IA para qualificação e gestão de leads.</h2>
            <p class="project-lead">
              O CRM Total Tour automatiza o funil comercial usando Kommo, n8n, Redis e agentes de IA. O sistema consolida conversas, interpreta contexto, atualiza leads e auxilia na tomada de decisão comercial, reduzindo trabalho manual e aumentando a rastreabilidade.
            </p>
            <div class="proof-grid" aria-label="Resumo executivo CRM Total Tour">
              <div><span>Papel</span><p>Diagnóstico de workflow, testes E2E, correção de payloads e validação node por node.</p></div>
              <div><span>Decisão técnica</span><p>Consolidar contexto antes do agente para evitar análise prematura de mensagens fragmentadas.</p></div>
              <div><span>Resultado</span><p>Automação auditável que entrega leads qualificados e atualizações de funil em tempo real, melhorando a eficiência da equipe comercial.</p></div>
            </div>
            <div class="detail-block">
              <h3>Processos implementados</h3>
              <ul class="check-list">
                <li><strong>Mensagens &amp; Contexto:</strong> entrada inbound/outbound via webhooks, identificação de lead, canal e histórico; buffer Redis com janela de espera para consolidar mensagens antes de análise.</li>
                <li><strong>Atualização de leads:</strong> consulta e atualização de campos customizados como resumo, orçamento, passageiros, destino e status; criação de tarefas.</li>
                <li><strong>Agente de IA &amp; QA:</strong> classificação de intenção, síntese de contexto, apoio à movimentação no funil e testes E2E em n8n (nodes, erros de API e limites de modelo).</li>
              </ul>
            </div>
            <div class="stack-groups">
              <div><span>CRM</span><p>Kommo API, pipelines, leads, eventos e campos customizados.</p></div>
              <div><span>Automação</span><p>n8n, webhooks, Redis buffer, HTTP requests e controle de execução.</p></div>
              <div><span>IA</span><p>OpenAI/LangChain agent para contexto comercial e decisão de etapa.</p></div>
              <div><span>Segurança</span><p>Dados de clientes redigidos; o portfolio mostra arquitetura, não informação privada.</p></div>
            </div>
          </div>
          <div class="project-media reveal crm-gallery">
            <img class="media-main" src="/assets/portfolio/crm/screen-01.png" alt="Painel do CRM Total Tour">
            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/crm/screen-02.png" aria-label="Abrir funil CRM Total Tour">
                <img src="/assets/portfolio/crm/screen-02.png" alt="Funil do CRM Total Tour">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/crm/screen-03.png" aria-label="Abrir automacao CRM Total Tour">
                <img src="/assets/portfolio/crm/screen-03.png" alt="Automação do CRM Total Tour">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/crm/screen-04.png" aria-label="Abrir atendimento CRM Total Tour">
                <img src="/assets/portfolio/crm/screen-04.png" alt="Atendimento do CRM Total Tour">
              </button>
            </div>
            <p>Visual seguro: dados de clientes e leads removidos.</p>
          </div>
        </div>
      </article>

      <section id="apis" class="section-shell api-section" aria-labelledby="apis-title">
        <div class="section-heading reveal">
          <p class="eyebrow">APIs e serviços</p>
          <h2 id="apis-title">Uma pequena parte sobre APIs que não constam em nenhum desses projetos.</h2>
          <p class="section-intro">Além dos produtos principais, também existem serviços independentes usados para geração, upload, orquestração, mídia e automações.</p>
        </div>
        <div class="api-grid reveal" aria-label="APIs complementares">
          <span>music-vsti-midi-api</span>
          <span>creator-api</span>
          <span>anark.AI</span>
          <span>super-video-hub</span>
          <span>upload-api</span>
          <span>webhooks n8n</span>
        </div>
      </section>

      <section class="section-shell capabilities" aria-labelledby="skills-title">
        <div class="section-heading reveal">
          <p class="eyebrow">Competências recorrentes</p>
          <h2 id="skills-title">O que esses projetos demonstram tecnicamente.</h2>
        </div>
        <div class="capability-grid">
          <div class="capability reveal"><span>01</span><h3>Produto e interface</h3><p>React, Next.js, Vite, TypeScript, UI responsiva e fluxos pensados para uso real, não apenas demo.</p></div>
          <div class="capability reveal"><span>02</span><h3>APIs e contratos</h3><p>FastAPI, Node/Next API routes, REST, webhooks, jobs assíncronos e payloads versionáveis.</p></div>
          <div class="capability reveal"><span>03</span><h3>Dados e autenticação</h3><p>Supabase, PostgreSQL, Prisma, JWT, storage e modelagem para sistemas com várias etapas.</p></div>
          <div class="capability reveal"><span>04</span><h3>Agentes e workflows</h3><p>n8n, LLMs, roteamento, normalização, análise, QA e integração com serviços externos.</p></div>
          <div class="capability reveal"><span>05</span><h3>Infraestrutura</h3><p>Linux VPS, Docker, health checks, logs, deploy em Vercel e diagnóstico de incidentes.</p></div>
          <div class="capability reveal"><span>06</span><h3>Execução ponta a ponta</h3><p>Capacidade de sair do problema aberto, definir arquitetura, implementar, validar e documentar.</p></div>
        </div>
      </section>

      <section id="blog" class="section-shell blog-radar" aria-labelledby="blog-title">
        <div class="blog-heading reveal">
          <div class="section-heading">
            <p class="eyebrow">Blog / radar de tecnologia</p>
            <h2 id="blog-title">Aprenda sobre IA, automação e produtos digitais.</h2>
            <p class="section-intro">Curadoria editorial para conectar o portfolio aos temas que aparecem nos projetos: agentes de código, Supabase, React, Vercel, segurança, automação, CRM, áudio, vídeo, marketplaces e operação de produto.</p>
          </div>
          <div class="blog-controls" aria-label="Controles do blog">
            <button type="button" data-blog-scroll="-1" aria-label="Ver artigos anteriores">‹</button>
            <button type="button" data-blog-scroll="1" aria-label="Ver próximos artigos">›</button>
          </div>
        </div>
        <div class="blog-grid reveal" data-blog-carousel aria-label="Radar de notícias e leituras">
          <a href="https://openai.com/news/" target="_blank" rel="noopener noreferrer"><span>OpenAI</span><strong>Codex remoto e agentes de engenharia em produção.</strong><em>IA para desenvolvimento</em></a>
          <a href="https://openai.com/news/" target="_blank" rel="noopener noreferrer"><span>OpenAI</span><strong>Sandbox seguro para executar agentes de código no Windows.</strong><em>Segurança e automação</em></a>
          <a href="https://openai.com/news/" target="_blank" rel="noopener noreferrer"><span>OpenAI</span><strong>Resposta ao ataque de supply chain no ecossistema TanStack/npm.</strong><em>Segurança frontend</em></a>
          <a href="https://openai.com/news/" target="_blank" rel="noopener noreferrer"><span>OpenAI</span><strong>Como rodar Codex com segurança em fluxos de engenharia.</strong><em>AI coding</em></a>
          <a href="https://openai.com/news/" target="_blank" rel="noopener noreferrer"><span>OpenAI</span><strong>Modelos avançados aplicados a segurança cibernética.</strong><em>Cyber + IA</em></a>
          <a href="https://www.anthropic.com/news" target="_blank" rel="noopener noreferrer"><span>Anthropic</span><strong>Claude Opus 4.7 com foco em coding, agentes e visão.</strong><em>Modelos fortes</em></a>
          <a href="https://www.anthropic.com/news" target="_blank" rel="noopener noreferrer"><span>Anthropic</span><strong>Claude Design e a aproximação entre IA, protótipo e interface.</strong><em>UI com IA</em></a>
          <a href="https://www.anthropic.com/news" target="_blank" rel="noopener noreferrer"><span>Anthropic</span><strong>Project Glasswing e colaboração para software crítico seguro.</strong><em>Segurança</em></a>
          <a href="https://www.anthropic.com/news" target="_blank" rel="noopener noreferrer"><span>Anthropic</span><strong>Claude para pequenas empresas e aplicações SaaS.</strong><em>SaaS</em></a>
          <a href="https://www.anthropic.com/news" target="_blank" rel="noopener noreferrer"><span>Anthropic</span><strong>Agentes para serviços financeiros e fluxos empresariais.</strong><em>Agentes</em></a>
          <a href="https://vercel.com/blog" target="_blank" rel="noopener noreferrer"><span>Vercel</span><strong>Infraestrutura agentic para deploy, observabilidade e IA.</strong><em>Deploy + agentes</em></a>
          <a href="https://vercel.com/blog" target="_blank" rel="noopener noreferrer"><span>Vercel</span><strong>Workflows para execução durável em agentes e backends.</strong><em>Orquestração</em></a>
          <a href="https://vercel.com/blog" target="_blank" rel="noopener noreferrer"><span>Vercel</span><strong>Boas práticas para não confiar cegamente em código gerado por IA.</strong><em>QA e produção</em></a>
          <a href="https://vercel.com/blog" target="_blank" rel="noopener noreferrer"><span>Vercel</span><strong>AI Gateway como camada única para roteamento de modelos.</strong><em>Model routing</em></a>
          <a href="https://vercel.com/changelog" target="_blank" rel="noopener noreferrer"><span>Vercel</span><strong>Changelog de plataforma para apps web, edge e observabilidade.</strong><em>Frontend cloud</em></a>
          <a href="https://supabase.com/blog" target="_blank" rel="noopener noreferrer"><span>Supabase</span><strong>Postgres como base para autenticação, dados e produtos SaaS.</strong><em>Banco de dados</em></a>
          <a href="https://supabase.com/blog" target="_blank" rel="noopener noreferrer"><span>Supabase</span><strong>Edge Functions para proteger segredos e integrar APIs externas.</strong><em>Serverless</em></a>
          <a href="https://supabase.com/blog" target="_blank" rel="noopener noreferrer"><span>Supabase</span><strong>Auth, RLS e sessão como fundação para apps protegidos.</strong><em>Autenticação</em></a>
          <a href="https://supabase.com/blog" target="_blank" rel="noopener noreferrer"><span>Supabase</span><strong>Storage e uploads para produtos com mídia, áudio e vídeo.</strong><em>Storage</em></a>
          <a href="https://supabase.com/blog" target="_blank" rel="noopener noreferrer"><span>Supabase</span><strong>Realtime e eventos como base para dashboards vivos.</strong><em>Realtime</em></a>
          <a href="https://react.dev/blog" target="_blank" rel="noopener noreferrer"><span>React</span><strong>Atualizações do React para interfaces interativas e performáticas.</strong><em>Frontend</em></a>
          <a href="https://react.dev/blog" target="_blank" rel="noopener noreferrer"><span>React</span><strong>Server Components e arquitetura moderna de UI.</strong><em>Arquitetura</em></a>
          <a href="https://vite.dev/blog" target="_blank" rel="noopener noreferrer"><span>Vite</span><strong>Build rápido para portfolios, SPAs e produtos em produção.</strong><em>Performance</em></a>
          <a href="https://tanstack.com/blog" target="_blank" rel="noopener noreferrer"><span>TanStack</span><strong>Roteamento, query e tabelas para apps React complexos.</strong><em>React stack</em></a>
          <a href="https://github.blog/news-insights/product-news/" target="_blank" rel="noopener noreferrer"><span>GitHub</span><strong>Copilot, Actions e plataforma de colaboração para devs.</strong><em>Dev tools</em></a>
          <a href="https://github.blog/security/" target="_blank" rel="noopener noreferrer"><span>GitHub</span><strong>Segurança de supply chain para npm, repositórios e CI.</strong><em>Security</em></a>
          <a href="https://www.docker.com/blog/" target="_blank" rel="noopener noreferrer"><span>Docker</span><strong>Containers para isolar APIs, jobs e serviços de áudio.</strong><em>Infra</em></a>
          <a href="https://www.postgresql.org/about/news/" target="_blank" rel="noopener noreferrer"><span>PostgreSQL</span><strong>Novidades do banco usado em produtos SaaS e automações.</strong><em>Database</em></a>
          <a href="https://fastapi.tiangolo.com/release-notes/" target="_blank" rel="noopener noreferrer"><span>FastAPI</span><strong>APIs Python modernas para jobs, mídia e backends locais.</strong><em>Backend</em></a>
          <a href="https://www.python.org/blogs/" target="_blank" rel="noopener noreferrer"><span>Python</span><strong>Ecossistema Python para IA, automação e processamento.</strong><em>Backend + IA</em></a>
          <a href="https://www.typescriptlang.org/blog/" target="_blank" rel="noopener noreferrer"><span>TypeScript</span><strong>Evolução de tipagem para apps frontend e serverless.</strong><em>Qualidade</em></a>
          <a href="https://stripe.com/newsroom" target="_blank" rel="noopener noreferrer"><span>Stripe</span><strong>Pagamentos, billing e wallet para produtos SaaS.</strong><em>Billing</em></a>
          <a href="https://sentry.io/changelog/" target="_blank" rel="noopener noreferrer"><span>Sentry</span><strong>Monitoramento de erros, tracing e qualidade de produção.</strong><em>Observabilidade</em></a>
          <a href="https://linear.app/changelog" target="_blank" rel="noopener noreferrer"><span>Linear</span><strong>Gestão de produto, issues e workflows de engenharia.</strong><em>Produto</em></a>
          <a href="https://www.notion.com/releases" target="_blank" rel="noopener noreferrer"><span>Notion</span><strong>Documentação viva, bases de conhecimento e colaboração.</strong><em>Docs</em></a>
          <a href="https://n8n.io/blog/" target="_blank" rel="noopener noreferrer"><span>n8n</span><strong>Automação, webhooks e agentes conectando sistemas reais.</strong><em>Workflows</em></a>
          <a href="https://www.cloudflare.com/developer-platform/changelog/" target="_blank" rel="noopener noreferrer"><span>Cloudflare</span><strong>Edge, Workers, segurança e performance global.</strong><em>Edge</em></a>
          <a href="https://developer.mozilla.org/en-US/blog/" target="_blank" rel="noopener noreferrer"><span>MDN</span><strong>Web APIs, acessibilidade e padrões para interfaces robustas.</strong><em>Web platform</em></a>
          <a href="https://web.dev/blog/" target="_blank" rel="noopener noreferrer"><span>web.dev</span><strong>Performance, Core Web Vitals e SEO técnico.</strong><em>SEO + performance</em></a>
          <a href="https://www.infoq.com/ai-ml-data-eng/" target="_blank" rel="noopener noreferrer"><span>InfoQ</span><strong>Arquitetura, dados, IA e engenharia em escala.</strong><em>Arquitetura</em></a>
          <a href="https://thenewstack.io/category/ai/" target="_blank" rel="noopener noreferrer"><span>The New Stack</span><strong>AI agents, plataformas de dev e infraestrutura moderna.</strong><em>AI engineering</em></a>
          <a href="https://techcrunch.com/category/artificial-intelligence/" target="_blank" rel="noopener noreferrer"><span>TechCrunch</span><strong>Mercado de IA, startups e produtos digitais.</strong><em>Mercado</em></a>
          <a href="https://venturebeat.com/category/ai/" target="_blank" rel="noopener noreferrer"><span>VentureBeat</span><strong>IA corporativa, automação e adoção em negócios.</strong><em>Enterprise AI</em></a>
          <a href="https://www.theverge.com/ai-artificial-intelligence" target="_blank" rel="noopener noreferrer"><span>The Verge</span><strong>IA generativa, apps de consumo e novas interfaces.</strong><em>Produto</em></a>
          <a href="https://www.musicbusinessworldwide.com/" target="_blank" rel="noopener noreferrer"><span>MBW</span><strong>Mercado musical, streaming e tecnologia para artistas.</strong><em>Music tech</em></a>
          <a href="https://www.billboard.com/pro/" target="_blank" rel="noopener noreferrer"><span>Billboard Pro</span><strong>Indústria musical, monetização e distribuição digital.</strong><em>Música</em></a>
          <a href="https://www.streamingmedia.com/" target="_blank" rel="noopener noreferrer"><span>Streaming Media</span><strong>Vídeo, streaming, encoding e publicação multiplataforma.</strong><em>Video tech</em></a>
          <a href="https://www.crmsearch.com/" target="_blank" rel="noopener noreferrer"><span>CRMsearch</span><strong>CRM, automação comercial e relacionamento com clientes.</strong><em>CRM</em></a>
          <a href="https://www.retaildive.com/" target="_blank" rel="noopener noreferrer"><span>Retail Dive</span><strong>Comércio digital, marketplaces e experiência de compra.</strong><em>Marketplace</em></a>
          <a href="https://www.producthunt.com/stories" target="_blank" rel="noopener noreferrer"><span>Product Hunt</span><strong>Novos produtos SaaS, ferramentas de IA e tendências de lançamento.</strong><em>Produto</em></a>
        </div>
        <div class="blog-action reveal">
          <a class="button secondary" href="https://openai.com/news/" target="_blank" rel="noopener noreferrer">Ver todos os artigos</a>
        </div>
      </section>

      <section class="section-shell contact-section" aria-labelledby="contact-title">
        <div class="contact-card reveal">
          <p class="eyebrow">Contato</p>
          <h2 id="contact-title">Busco minha primeira oportunidade formal como Full Stack / Backend Developer, com foco em automação e IA aplicada.</h2>
          <p>
            Quero contribuir em um time que valorize produto, revisão técnica e operação real - trazendo minha experiência prática para evoluir como engenheiro e entregar valor em sistemas que realmente funcionam.
          </p>
          <div class="hero-actions">
            <a class="button primary" href="mailto:felpacontato@gmail.com">Enviar e-mail</a>
            <a class="button secondary" href="https://github.com/felpacontato" rel="noopener noreferrer" target="_blank">GitHub</a>
            <a class="button secondary" href="https://www.linkedin.com/in/felipe-prates-070985376/" rel="noopener noreferrer" target="_blank">LinkedIn</a>
          </div>
        </div>
      </section>
    </main>

    <div class="lightbox" data-lightbox-root hidden>
      <button class="lightbox-close" type="button" data-lightbox-close aria-label="Fechar imagem">Fechar</button>
      <img src="" alt="Imagem ampliada do projeto" data-lightbox-img>
    </div>

    <section class="jonny-widget" data-jonny aria-label="Chat IA Jonny">
      <div class="jonny-panel" id="jonny-panel" data-jonny-panel hidden>
        <div class="jonny-header">
          <div>
            <span class="jonny-status">IA do portfolio</span>
            <h2>Jonny</h2>
          </div>
          <button class="jonny-close" type="button" data-jonny-close aria-label="Fechar chat">Fechar</button>
        </div>
        <div class="jonny-messages" data-jonny-messages aria-live="polite">
          <div class="jonny-message jonny-message-bot">
            <p>Sou o Jonny, assistente IA do portfolio do Felipe. Posso resumir projetos, stack, experiencia com IA, automacoes e pontos para entrevista.</p>
          </div>
        </div>
        <div class="jonny-prompts" data-jonny-prompts aria-label="Perguntas rapidas"></div>
        <form class="jonny-form" data-jonny-form>
          <label class="sr-only" for="jonny-input">Pergunte ao Jonny</label>
          <input id="jonny-input" name="message" type="text" autocomplete="off" maxlength="500" placeholder="Pergunte sobre projetos, stack ou experiencia..." data-jonny-input>
          <button type="submit" data-jonny-submit>Enviar</button>
        </form>
      </div>
      <button class="jonny-fab" type="button" data-jonny-toggle aria-expanded="false" aria-controls="jonny-panel">
        <span>Jonny</span>
        <small>IA</small>
      </button>
    </section>

  `;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Felipe Prates | Full Stack, IA e Automação" },
      { name: "description", content: "Portfolio de Felipe Prates: produtos full stack com IA, automação, APIs, dados, deploy e operação de ponta a ponta." },
      { property: "og:title", content: "Felipe Prates | Full Stack, IA e Automação" },
      { property: "og:description", content: "Produtos reais, decisões técnicas e entrega ponta a ponta: FelpaMusic, Vitrinno, Helena Video, Billie Brain, Verdant CRM, OLI Locações e CRM Total Tour." },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#050807" },
    ],
    links: [{ rel: "stylesheet", href: "/portfolio.css" }],
  }),
  component: Index,
});

export function Index() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (!introDone) return;

    const s = document.createElement("script");
    s.type = "module";
    s.src = "/main.js";
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;

    let root: Root | null = null;
    let raf = 0;
    const mount = () => {
      const el = document.getElementById("projects-circular-gallery");
      if (!el) { raf = window.requestAnimationFrame(mount); return; }
      root = createRoot(el);
      root.render(
        <CircularGallery items={GALLERY_ITEMS} />
      );
    };
    mount();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (root) { const r = root; setTimeout(() => r.unmount(), 0); }
    };
  }, [introDone]);

  return (
    <>
      {!introDone && <PortfolioIntro onDone={() => setIntroDone(true)} />}
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
