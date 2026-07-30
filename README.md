# Felipe Prates | Portfolio

Portfolio técnico de Felipe Prates, desenvolvedor full stack com foco em produtos digitais, automação e inteligência artificial aplicada.

**Produção:** [www.portfolio.felpamusic.com.br](https://www.portfolio.felpamusic.com.br)

## Sobre o projeto

Este repositório reúne a implementação do portfolio e os estudos de caso dos principais produtos desenvolvidos por Felipe. Cada projeto apresenta contexto, responsabilidades, decisões técnicas, arquitetura, tecnologias e resultado.

Projetos em destaque:

- **FelpaMusic:** plataforma musical com criação, edição e processamento de áudio.
- **Vitrinno:** rede social musical com catálogo, studio e monetização.
- **Helena Video:** studio de vídeo com módulos criativos e pipeline de publicação.
- **Lunna Helena Universe:** plataforma para creators com experiências interativas.
- **Billie Brain:** assistente de engenharia com chat e workspace visual.
- **Verdant CRM:** CRM conversacional para operação comercial.
- **Vitaey:** plataforma de posicionamento profissional e análise de carreira.
- **OLI Locações:** marketplace e operação de locações.
- **CRM Total Tour:** automação comercial e qualificação de leads.

## Stack

- React 19 e TypeScript
- TanStack Router e TanStack Query
- Vite e Tailwind CSS
- Vercel Functions
- Playwright para validação visual
- ESLint e Prettier

## Arquitetura

O portfolio usa uma aplicação React com geração estática pelo Vite. Os estudos de caso, galerias e traduções são servidos pelo frontend, enquanto o assistente Jonny utiliza uma função serverless isolada. Imagens e vídeos ficam em `public/assets`, organizados por projeto.

```text
src/
  components/       Componentes de interface
  routes/           Páginas e estudos de caso
  lib/              Dados e utilitários
public/
  assets/           Imagens, vídeos e áudios
api/
  jonny.js          Função serverless do assistente
scripts/
  qa-portfolio-visual.mjs
```

## Desenvolvimento local

Requisitos:

- Node.js 24
- pnpm 10

```bash
pnpm install
pnpm run dev
```

O servidor local informa a URL de acesso no terminal.

## Qualidade

```bash
pnpm run lint
pnpm run build
pnpm run qa:visual
```

O fluxo de validação cobre build de produção, análise estática, navegação, responsividade e overflow horizontal.

## Contato

- [LinkedIn](https://www.linkedin.com/in/felipe-prates-3263b0223/)
- [GitHub](https://github.com/felpacontato)
- [Portfolio](https://www.portfolio.felpamusic.com.br)
