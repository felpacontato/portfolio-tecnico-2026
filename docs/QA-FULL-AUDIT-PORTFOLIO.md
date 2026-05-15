# Auditoria Full Stack QA - Portfolio

## 1. Resumo executivo

| Item | Resultado |
|---|---:|
| Total de paginas auditadas | 2 rotas reais: `/` e rota inexistente via fallback do Vite |
| Total de secoes auditadas | 10 |
| Total de botoes auditados | 12 |
| Total de links auditados | 30 internos/externos principais |
| Total de projetos/cards auditados | 7 |
| Total de APIs auditadas | 0 APIs proprias no portfolio |
| Total de bugs criticos | 2 |
| Total de bugs medios | 4 |
| Total de bugs baixos | 3 |
| Status geral | Parcialmente aprovado antes das correcoes; aprovado no QA local apos correcoes |

Evidencias geradas:

- `output/portfolio-qa/desktop.png`
- `output/portfolio-qa/tablet.png`
- `output/portfolio-qa/mobile.png`
- `output/portfolio-qa/qa-portfolio-visual.json`

Atualizacao 2026-05-15: o QA foi executado novamente apos inserir os links reais nos cards da secao Projetos. O teste Playwright validou 7 cards no carrossel em desktop/tablet/mobile, sem `console.error`, sem overflow horizontal e com os 6 links publicos recebidos abrindo em nova aba com `rel="noopener noreferrer"`.

## 2. Paginas auditadas

| Pagina | Arquivo | Status | Problemas | Prioridade | Correcao |
|---|---|---|---|---|---|
| `/` | `src/routes/index.tsx` | Corrigida | Billie Brain e Verdant CRM nao existiam como cases completos; carrossel podia voltar ao fallback; mobile tinha overflow | Alta | Cases adicionados, montagem do carrossel corrigida, CSS responsivo endurecido |
| `/home`, `/about`, `/projects`, `/contato`, `/blog` | Nao existem como rotas separadas | Aceitavel | Portfolio atual e uma landing one-page com ancoras reais | Baixa | Mantido como one-page para nao alterar arquitetura |
| Rota inexistente | Vite/TanStack fallback | Parcial | Nao ha 404 customizada dedicada | Media | Documentado como pendencia, sem criar rota nova fora do escopo |

## 3. Secoes auditadas

| Secao | Pagina | Status | Problemas | Correcao |
|---|---|---|---|---|
| Header/Nav | `/` | Corrigida | Nav nao incluia Billie Brain e Verdant | Links internos adicionados |
| Hero | `/` | Corrigida | Override desktop afetava mobile | Override mobile final aplicado |
| Direcao tecnica | `/` | Corrigida | Carrossel horizontal interno vazava scroll em tablet | Contencao de overflow aplicada |
| Projetos/carrossel | `/` | Corrigida | Carrossel React era apagado apos intro | Montagem movida para depois da intro |
| FelpaMusic | `/` | Aprovada | Sem bloqueio critico | Mantida |
| Vitrinno | `/` | Aprovada | Sem bloqueio critico | Mantida |
| Billie Brain | `/` | Adicionada | Ausente | Novo case completo com imagens e link real |
| Verdant CRM | `/` | Adicionada | Ausente | Novo case honesto: areas internas protegidas por login |
| Helena/OLI/CRM | `/` | Corrigida | Ordem era alterada por JS em runtime | Mutacao de ordem removida |
| Contato | `/` | Aprovada | Usa `mailto`, GitHub e LinkedIn, sem formulario fake | Mantido como contato direto |

## 4. Botoes e elementos interativos

| Pagina | Elemento | Arquivo | Acao esperada | Status atual | Problema | Correcao |
|---|---|---|---|---|---|---|
| `/` | Ver projetos | `src/routes/index.tsx` | Ir para `#projetos` | OK | Nenhum | Mantido |
| `/` | GitHub | `src/routes/index.tsx` | Abrir GitHub real | Corrigido | Faltava `noopener` | `rel="noopener noreferrer"` |
| `/` | LinkedIn | `src/routes/index.tsx` | Abrir LinkedIn real | Corrigido | Faltava `noopener` | `rel="noopener noreferrer"` |
| `/` | Contato | `src/routes/index.tsx` | Abrir email | OK | Nenhum | Mantido |
| `/` | Cards do carrossel | `CircularGallery.tsx` | Abrir sites reais dos projetos em nova aba | Corrigido | Montagem podia sumir e links ainda eram internos | Montagem apos intro + links externos reais + QA Playwright |
| `/` | Thumbnails de projeto | `public/main.js` | Abrir lightbox | OK | Imagem dinamica tinha alt vazio no HTML inicial | Alt descritivo adicionado |
| `/` | Jonny | `public/main.js` | Abrir chat local do portfolio | OK | Sem API externa; conhecimento local honesto | Mantido |

## 5. Links externos

| Texto do link | URL | Status | Abre corretamente? | Problema | Correcao |
|---|---|---|---|---|---|
| FelpaMusic | `https://www.felpamusic.com.br` | 200 OK | Sim | Card nao apontava para deploy publico | Link aplicado no card e no case |
| Vitrinno | `https://www.vitrinno.felpamusic.com.br` | 200 OK | Sim | Card nao apontava para deploy publico | Link aplicado no card e no case |
| Helena Video | `https://www.helena-video.felpamusic.com.br` | 307 -> 200 | Sim, redireciona para login protegido | Card nao apontava para deploy publico | Link aplicado no card e no case |
| Billie Brain | `https://www.billie-brain.felpamusic.com.br` | 200 OK | Sim | Ausente no portfolio | Case e link adicionados |
| Verdant CRM | `https://www.verdant-crm.felpamusic.com.br` | 307 -> 200 | Sim, area protegida redireciona | Poderia parecer tela interna aberta | Copy descreve protecao/login honestamente |
| OLI Locacoes | `https://www.olilocacao.com.br` | 200 OK | Sim | Card nao apontava para deploy publico | Link aplicado no card e no case |
| GitHub | `https://github.com/felpacontato` | Nao alterado | Sim | Rel incompleto | `noopener noreferrer` |
| LinkedIn | `https://www.linkedin.com/in/felipe-prates-070985376/` | Nao alterado | Sim | Rel incompleto | `noopener noreferrer` |
| Email | `mailto:felpacontato@gmail.com` | OK | Abre cliente de email | Sem backend de formulario | Mantido como contato direto |

Observacao: no Windows, `curl.exe` falhou sem `-k` por verificacao de revogacao do Schannel; a validacao de dominio foi feita com `curl.exe -k -I -L --max-time 25`.

## 6. Cards de projetos

| Projeto | Card | Link deploy | Link GitHub | Imagem/logo | Status | Problema | Correcao |
|---|---|---|---|---|---|---|
| FelpaMusic | `https://www.felpamusic.com.br` | `www.felpamusic.com.br` | Nao exibido no card | OK | Aprovado | Card era interno | Link publico aplicado |
| Vitrinno | `https://www.vitrinno.felpamusic.com.br` | `www.vitrinno.felpamusic.com.br` | Nao exibido no card | OK | Aprovado | Card era interno | Link publico aplicado |
| Billie Brain | `https://www.billie-brain.felpamusic.com.br` | `www.billie-brain.felpamusic.com.br` | Nao exibido no card | OK | Adicionado | Ausente | Novo case, imagens e link publico |
| Verdant CRM | `https://www.verdant-crm.felpamusic.com.br` | `www.verdant-crm.felpamusic.com.br` | Nao exibido no card | OK | Adicionado | Ausente | Novo case, imagens e link publico |
| Helena Video | `https://www.helena-video.felpamusic.com.br` | `www.helena-video.felpamusic.com.br` | Nao exibido no card | OK | Aprovado | Ordem/link conflitantes | Ordem estabilizada e link publico aplicado |
| OLI Locacoes | `https://www.olilocacao.com.br` | `www.olilocacao.com.br` | Nao exibido no card | OK | Aprovado | Ordem/link conflitantes | Ordem estabilizada e link publico aplicado |
| CRM Total Tour | Interno `#crm` | Existente no case | Nao exibido no card | OK | Aprovado | Nenhum | Mantido |

## 7. Formularios

| Formulario | Campos | Endpoint/Servico | Status | Problema | Correcao |
|---|---|---|---|---|---|
| Contato | Nao ha formulario | `mailto:` | Honesto | Nao existe backend de contato | Mantido como CTA direto para email |
| Jonny | Campo de mensagem | Logica local `public/main.js` | OK | Nao e backend IA remoto | Widget se apresenta como assistente do portfolio, sem prometer backend externo |

## 8. APIs / Backend

| Endpoint/Servico | Usado por | Status | Problema | Impacto | Correcao |
|---|---|---|---|---|---|
| API propria do portfolio | N/A | Nao existe | Sem backend | Baixo | Site e estatico, sem formulario fake |
| `mailto:` | Contato | OK | Depende do cliente de email do usuario | Baixo | CTA claro |

## 9. SEO

| Pagina | Title | Description | OG image | H1 | Status | Correcao |
|---|---|---|---|---|---|---|
| `/` | Configurado | Configurada | Nao configurada explicitamente | Unico | Parcial | Description/OG description atualizada com Billie Brain e Verdant; OG image fica como pendencia |

## 10. Performance

- `npm run build` passou.
- Bundle principal apos a ultima validacao: `261.02 kB` JS, `70.40 kB` CSS antes de gzip.
- Imagens novas foram reaproveitadas de prints ja existentes, sem baixar assets externos novos.
- Carrossel agora monta de forma deterministica apos a intro e tem fallback real caso JS falhe.
- Lighthouse nao foi rodado nesta passada; Playwright cobriu desktop/tablet/mobile, console e overflow.

## 11. Acessibilidade

- Links principais tem texto visivel.
- Imagens do slider ganharam alt descritivo.
- Links externos corrigidos com `rel="noopener noreferrer"`.
- Lightbox recebeu alt descritivo inicial.
- Pendencia baixa: 404 customizada e auditoria axe dedicada.

## 12. Responsividade

| Pagina/Secao | Problema mobile/tablet | Impacto | Correcao |
|---|---|---|---|
| Hero | Override desktop com `!important` herdava no mobile | Layout torto | Override mobile final aplicado |
| Projetos/carrossel | React gallery podia desaparecer apos intro | Carrossel nao aparecia | Montagem dependente de `introDone` |
| Principle carousel | Cards horizontais vazavam para largura da pagina | Scroll horizontal indevido | `contain: paint`, `overflow-x`, `min-width: 0` |
| Image slider | Trilho animado entrava no `scrollWidth` | Scroll horizontal indevido | Contencao de overflow |

## 13. Codigo fake/mock/placeholder encontrado

| Arquivo | Linha | Ocorrencia | E problema? | Correcao |
|---|---:|---|---|---|
| `src/components/ui/demo.tsx` | 3 | `RainTextDemo` | Aceitavel | Componente isolado, nao exibido no portfolio |
| `src/components/ui/input-otp.tsx` | 36 | `hasFakeCaret` | Aceitavel | Nome interno de biblioteca UI, nao funcionalidade fake |
| `src/components/ui/*` | Varias | `placeholder:*`, `disabled:*` | Aceitavel | Classes de estilo de componentes reutilizaveis |
| `src/routes/index.tsx` | 606 | `img src=""` do lightbox | Aceitavel apos correcao | Alt adicionado; src e preenchido em runtime |
| `public/assets/*.png` | Binario | Texto `fake` dentro de bytes | Aceitavel | Falso positivo em arquivo binario |

## 14. Plano de correcao por prioridade

### Alta prioridade

- Adicionar Billie Brain como case real.
- Adicionar Verdant CRM como case real e honesto sobre area protegida.
- Corrigir carrossel que desaparecia apos intro.
- Remover overflow horizontal em tablet/mobile.

### Media prioridade

- Corrigir ordem mutada por JS entre Helena/OLI.
- Corrigir `rel` de links externos.
- Adicionar alt text em imagens do slider.
- Aplicar links publicos reais nos cards de FelpaMusic, Vitrinno, Billie Brain, Verdant CRM, Helena Video e OLI Locacoes.

### Baixa prioridade

- Criar 404 customizada.
- Configurar OG image especifica.
- Rodar Lighthouse/axe como etapa separada.

## 15. Checklist final

- [x] Home carrega
- [x] Todas as rotas reais carregam
- [x] Header funciona
- [x] Menu/mobile layout sem overflow horizontal no QA local
- [x] Footer/contato funciona via links reais
- [x] Todos os CTAs principais funcionam
- [x] Todos os cards de projetos funcionam e abrem links reais
- [x] Links externos principais funcionam ou foram classificados
- [x] Logos/imagens principais carregam no QA local
- [x] Nenhuma imagem nova quebrada
- [x] Nenhum projeto fake adicionado
- [x] Nenhum card fake adicionado
- [x] Nenhum botao fake adicionado
- [x] Nenhum link fake adicionado
- [x] Formulario de contato nao existe; contato e honesto via `mailto:`
- [x] Email/GitHub/LinkedIn funcionam como links reais
- [ ] Download de CV nao existe no escopo atual
- [x] SEO basico configurado
- [ ] Open Graph image especifica pendente
- [x] Favicon existente nao alterado
- [x] Mobile sem overflow horizontal
- [x] Nenhum erro critico no console no QA Playwright
- [x] Nenhum erro critico no build
- [x] Nenhum request 404 de asset observado no QA visual local
- [x] Teste Playwright visual criado
- [x] Teste Playwright visual passando
