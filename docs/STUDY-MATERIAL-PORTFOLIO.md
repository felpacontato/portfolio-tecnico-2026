# Material de estudo do portfolio

## O que foi criado

Foi criada uma area nova no portfolio oficial:

- `/study`: site de estudo/apresentacao com sidebar, capitulos por projeto, tabelas tecnicas, fluxos, explicacoes para iniciante, secoes de entrevista e glossario.
- `/print`: versao para impressao/PDF com todo o conteudo expandido.
- Botao `Exportar PDF`, que chama `window.print()`.
- CSS com `@media print`, ocultando navegacao interativa e organizando quebras por capitulo.

## Projetos documentados

- FelpaMusic
- Billie Brain
- Vitrinno
- Helena Video
- Verdant CRM
- Oli Drive Rent
- CRM Total Tour

## Fontes analisadas

- `C:\Users\feema\felpamusic`
- `C:\Users\feema\billie-joe`
- `C:\Users\feema\vitrinno`
- `C:\Users\feema\helena-video`
- `C:\Users\feema\CRM-Verdant`
- `C:\Users\feema\oli-drive-rent-review`
- `C:\Users\feema\portfolio-felipe-prates`

## Informacoes pendentes

- CRM Total Tour nao teve repositorio local confirmado neste workspace, entao o capitulo foi marcado como pendente.
- Alguns schemas Supabase e integracoes externas precisam de validacao manual em producao.
- Secrets reais nao foram exibidos nem documentados.

## Como rodar localmente

```bash
npm install
npm run dev
```

Depois abrir:

- `http://localhost:5173/study`
- `http://localhost:5173/print`

## Como exportar PDF

1. Abrir `/study` ou `/print`.
2. Clicar em `Exportar PDF`.
3. No dialog do navegador, escolher `Salvar como PDF`.

## Validacao feita

- `npm run lint`: passou com 6 warnings antigos de Fast Refresh em componentes `ui`.
- `npm run build`: passou.
- `/study`: HTTP 200 local.
- `/print`: HTTP 200 local.
- Screenshot desktop `/study`: gerado e conferido.
- Screenshot mobile `/study`: gerado e conferido.
- Screenshot `/print`: gerado.

